import IconContainer from 'app/components/ui/IconContainer';
import WeatherIcons from 'app/components/ui/WeatherTag/icons';
import { CurrentWeatherResponse } from 'app/services/types/currentWeather';
import { getCurrentWeather } from 'app/services/WeatherService';
import { LatLng } from 'leaflet';
import styled from 'styled-components';
import useFetchOnMove from './hooks/useFetchOnMove';
import MouseMoveLoadableContentTooltip from './common/MouseMoveLoadableContentTooltip';
import MouseMoveTooltip from './common/MouseMoveTooltip';

const TemperaureContainer = styled.div`
    display: flex;
    align-items: center;
`;

const TemperatureTooltip: React.FC = () => {
    const {
        data,
        handleMove,
        isLoading,
        error
    } = useFetchOnMove<CurrentWeatherResponse>(getCurrentWeather);

    const handleMouseMove = (latlng: LatLng) => {
        handleMove({ lat: latlng.lat, lon: latlng.lng });
    };

    const weatherIconCode = data?.weather[0]?.icon;
    const WeatherIcon = weatherIconCode ? WeatherIcons[weatherIconCode] : null;
    const temp = data?.main?.temp;

    return (
        <MouseMoveTooltip onMove={handleMouseMove}>
            <MouseMoveLoadableContentTooltip
                isError={error}
                isLoading={isLoading}
            >
                <TemperaureContainer>
                    {WeatherIcon ? <IconContainer><WeatherIcon /></IconContainer> : null}
                    <span style={{ marginLeft: 8 }}>
                        {temp}
                        °
                    </span>
                </TemperaureContainer>
            </MouseMoveLoadableContentTooltip>
        </MouseMoveTooltip>
    );
};

export default TemperatureTooltip;
