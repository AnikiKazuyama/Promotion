import WeatherIcons from 'app/components/ui/WeatherTag/icons';
import { WeatherIconsId } from 'app/services/types/common';

const getWeatherIconByWeatherCode = (
    code: WeatherIconsId | undefined
) => (code ? WeatherIcons[code] : () => null);

export default getWeatherIconByWeatherCode;
