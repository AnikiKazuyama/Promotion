import { themeTransitioned } from 'app/common/styles/mixins';
import { AnyType } from 'app/common/types';
import { WeatherIconsId } from 'app/Weather/services/types/common';
import { forwardRef } from 'react';
import styled from 'styled-components';
import IconContainer from '../IconContainer';
import WeatherIcons from './icons';

type WeatherTag = {
    humidity?: string
    weatherCode: WeatherIconsId
    temperature: number
    timeInText?: string
    ref?: AnyType
}

const Humidity = styled.div`
    color: var(--colors-font-wet);
    
    ${themeTransitioned()}
`;

const TimePeriod = styled.div`
    font-size: 14px;
    margin-top: 8px;
    margin-bottom: 4px;
`;

const Temperature = styled.div`
    color: var(--colors-font-secondary);
    font-size: 12px;

    ${themeTransitioned()}
`;

export const StyledWeatherTag = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const WeatherTag = forwardRef<HTMLDivElement, WeatherTag>(({
    humidity,
    weatherCode,
    temperature,
    timeInText
}, ref) => {
    const WeatherIcon = WeatherIcons[weatherCode];

    return (
        <StyledWeatherTag ref={ref}>
            {humidity ? <Humidity>{humidity}</Humidity> : null}
            <IconContainer size="l"><WeatherIcon /></IconContainer>
            {timeInText ? <TimePeriod>{timeInText}</TimePeriod> : null}
            <Temperature>
                {temperature}
                °
            </Temperature>
        </StyledWeatherTag>
    );
});
export default WeatherTag;
