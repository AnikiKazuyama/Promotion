import IconContainer from 'app/Weather/components/elemets/IconContainer';
import WeatherIcons from 'app/Weather/components/elemets/WeatherTag/icons';
import { CurrentWeatherResponse } from 'app/Weather/services/types/currentWeather';
import { getCurrentWeather } from 'app/Weather/services/WeatherService';
import { LatLng } from 'leaflet';
import { isEqual } from 'lodash';
import { useMemo, useState } from 'react';
import { useDebounce, usePrevious } from 'react-use';
import styled from 'styled-components';

type TemperatureTooltipProps = {
    position?: LatLng
};

const TemperaureContainer = styled.div`
    display: flex;
    align-items: center;
`;

const TemperatureTooltip: React.FC<TemperatureTooltipProps> = ({ position }) => {
    const [weather, setWeather] = useState<CurrentWeatherResponse>();
    const previousPosition = usePrevious(position);

    const updateTemperature = async () => {
        if (position && !isEqual(position, previousPosition)) {
            const result = await getCurrentWeather({
                coords: { lat: position.lat, lon: position.lng }
            });
            setWeather(result);
        }
    };

    useDebounce(updateTemperature, 400, [position]);
    const weatherIconCode = weather?.weather[0]?.icon;
    const WeatherIcon = weatherIconCode ? WeatherIcons[weatherIconCode] : null;
    const temp = weather?.main?.temp;

    return (
        !temp || !previousPosition || !isEqual(position, previousPosition)
            ? <TemperaureContainer>Loading</TemperaureContainer>
            : (
                <TemperaureContainer>
                    {WeatherIcon ? <IconContainer><WeatherIcon /></IconContainer> : null}
                    <span style={{ marginLeft: 8 }}>
                        {temp}
                        °
                    </span>
                </TemperaureContainer>
            )
    );
};

export default TemperatureTooltip;
