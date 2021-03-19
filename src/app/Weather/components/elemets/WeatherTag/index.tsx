import styled from 'styled-components';
import IconContainer from '../IconContainer';
import WeatherIcons from './icons';

type WeatherTag = {
    humidity?: string
    weatherCode: string
    temperature: number
    timeInText?: string
}

const Humidity = styled.div`
    color: blue;
`;

const TimePeriod = styled.div`
    font-size: 14px;
    margin-top: 8px;
    margin-bottom: 4px;
`;

const Temperature = styled.div`
    color: #b4b4b4;
    font-size: 12px;
`;

const StyledWeatherTag = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const WeatherTag: React.FC<WeatherTag> = ({
    humidity,
    weatherCode,
    temperature,
    timeInText
}) => {
    const WeatherIcon = WeatherIcons[weatherCode];
    console.log();
    return (
        <StyledWeatherTag>
            {humidity ? <Humidity>{humidity}</Humidity> : null}
            <IconContainer size="l"><WeatherIcon /></IconContainer>
            {timeInText ? <TimePeriod>{timeInText}</TimePeriod> : null}
            <Temperature>
                {temperature}
                °
            </Temperature>
        </StyledWeatherTag>
    );
};
export default WeatherTag;
