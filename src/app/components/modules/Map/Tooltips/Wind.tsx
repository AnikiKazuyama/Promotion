import { CurrentWeatherResponse } from 'app/services/types/currentWeather';
import { getCurrentWeather } from 'app/services/WeatherService';
import { LatLng } from 'leaflet';
import styled from 'styled-components';
import Wind, { StyledWindDirection } from 'app/components/ui/Wind';
import useFetchOnMove from './hooks/useFetchOnMove';
import MouseMoveLoadableContentTooltip from './common/MouseMoveLoadableContentTooltip';
import MouseMoveTooltip from './common/MouseMoveTooltip';

const WindContainer = styled.div`
    display: flex;
    align-items: center;

    ${StyledWindDirection} {
        border: none;
        margin: 0;
    }
`;

const WindTooltip: React.FC = () => {
    const {
        data,
        handleMove,
        isLoading,
        error
    } = useFetchOnMove<CurrentWeatherResponse>(getCurrentWeather);

    const handleMouseMove = (latlng: LatLng) => {
        handleMove({ lat: latlng.lat, lon: latlng.lng });
    };

    const wind = data?.wind;

    return (
        <MouseMoveTooltip onMove={handleMouseMove}>
            <MouseMoveLoadableContentTooltip
                isError={error}
                isLoading={isLoading}
            >
                {
                    wind ? (
                        <WindContainer>
                            <Wind power={wind?.speed} deg={wind?.deg} />
                        </WindContainer>
                    ) : null
                }
            </MouseMoveLoadableContentTooltip>
        </MouseMoveTooltip>
    );
};

export default WindTooltip;
