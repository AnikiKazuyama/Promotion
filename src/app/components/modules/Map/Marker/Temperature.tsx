import IconContainer from 'app/components/ui/IconContainer';
import { CurrentWeatherResponse } from 'app/services/types/currentWeather';
import { getCurrentWeather } from 'app/services/WeatherService';
import getWeatherIconByWeatherCode from 'app/utils/icon';
import { LatLng } from 'leaflet';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLocation } from 'app/context/location';
import ClickMarker from './Marker';

type TemperatureMarkerState = {
    isLoading: boolean
    weather: CurrentWeatherResponse | null
    error: boolean
}

const WeatherTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 12px;
`;

const StatsContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const Temperature = styled.div`
    font-size: 28px;
`;

const FeelsLike = styled.div`
    font-size: 12px;
    margin-top: -2px;
`;

const Description = styled.div`
    line-height: 1.43;
    margin-bottom: 12px;
`;

const Location = styled.div`
    font-size: 12px;
    color: #939cb0;
    line-height: 1.5;
    max-width: 197px;
`;

const TemperatureMarker: React.FC = () => {
    const [state, setState] = useState<TemperatureMarkerState>({
        isLoading: true,
        weather: null,
        error: false
    });
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    const { query } = useRouter();
    const locationStore = useLocation();

    const fetchWeather = async (latlng: LatLng | undefined) => {
        setIsOpen(true);
        if (state.weather !== null) return;

        try {
            setState({
                isLoading: true,
                weather: null,
                error: false
            });

            const currentWeather = await getCurrentWeather({ lat: latlng?.lat, lon: latlng?.lng });

            setState({
                isLoading: false,
                weather: currentWeather,
                error: false
            });
        } catch (e) {
            setState({
                isLoading: false,
                weather: null,
                error: true
            });
        }
    };

    const clear = () => {
        setIsOpen(false);
    };

    const { weather, isLoading, error } = state;
    const WeatherIcon = getWeatherIconByWeatherCode(weather?.weather[0].icon);

    return (
        <ClickMarker
            open={isOpen}
            initialPosition={locationStore.getLocation().coordinates}
            onOpenPopup={fetchWeather}
            onClosePopup={clear}
        >
            {isLoading && 'Loading'}
            {
                weather && (
                    <>
                        <Location>
                            {weather.name}
                            ,
                            {' '}
                            {weather.sys.country}
                        </Location>
                        <StatsContainer>
                            <div><IconContainer size="xl"><WeatherIcon /></IconContainer></div>
                            <div>
                                <Temperature>{weather.main.temp}</Temperature>
                                <FeelsLike>
                                    {t('feels like')}
                                    {' '}
                                    {weather.main.feelsLike}
                                </FeelsLike>
                            </div>
                        </StatsContainer>
                        <Description>{weather.weather[0].description}</Description>
                        <WeatherTable>
                            <tbody>
                                <tr>
                                    <td>{t('wind')}</td>
                                    <td>
                                        {weather.wind.speed}
                                        {' '}
                                        м\с
                                    </td>
                                </tr>
                                <tr>
                                    <td>{t('preassure')}</td>
                                    <td>{weather.main.pressure}</td>
                                </tr>
                                <tr>
                                    <td>{t('humidity')}</td>
                                    <td>
                                        {weather.main.humidity}
                                        %
                                    </td>
                                </tr>
                            </tbody>
                        </WeatherTable>
                        <Link
                            href={{
                                pathname: '/',
                                query: {
                                    mlng: query.mlng,
                                    mlat: query.mlat
                                }
                            }}
                            shallow={false}
                        >
                            {t('detailed forecast')}
                        </Link>
                    </>
                )
            }
            {error && 'error'}
        </ClickMarker>
    );
};

export default TemperatureMarker;
