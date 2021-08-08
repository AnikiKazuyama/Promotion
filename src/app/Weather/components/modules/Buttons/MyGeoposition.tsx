import { findCityByCoords } from 'app/Weather/services/WeatherService';
import pushToCity from 'app/Weather/utils/router';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Button from '../../elemets/Button';

export const MyGeoposition = observer(() => {
    const router = useRouter();
    const { t } = useTranslation();

    const getPositionSuccess = async (geolocation: GeolocationPosition) => {
        const suggestedLocation = await findCityByCoords({
            lat: geolocation.coords.latitude,
            lon: geolocation.coords.longitude
        });
        const suggestedCity = suggestedLocation.list[0];
        pushToCity(router, {
            lat: suggestedCity?.coord.lat,
            lon: suggestedCity?.coord.lat,
            name: suggestedCity?.name
        });
    };

    const getPosition = () => {
        navigator.geolocation.getCurrentPosition(getPositionSuccess);
    };

    return (
        <Button onClick={getPosition}>{t('my location')}</Button>
    );
});
export default MyGeoposition;
