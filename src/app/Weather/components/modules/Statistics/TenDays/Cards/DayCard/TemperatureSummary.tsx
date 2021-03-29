import { verticalAligned } from 'app/common/styles/mixins';
import IconContainer from 'app/Weather/components/elemets/IconContainer';
import { StyledWeatherTag, WeatherTag } from 'app/Weather/components/elemets/WeatherTag';
import WeatherIcons from 'app/Weather/components/elemets/WeatherTag/icons';
import styled from 'styled-components';
import { ShortDayStatistic } from '../../../types';

export const SmallSummaryWeather = styled.div`
    ${verticalAligned()}
    justify-content: space-between;
`;

export const WeatherWithIcon = styled.div`
    ${verticalAligned()}
`;

export const CurrentTemperature = styled.span`
    margin-right: 12px;
    font-size: 82px;
    font-weight: 100;
`;

export const DaySummaryWeather = styled.div`
    ${verticalAligned()}
    justify-content: flex-start;
    padding: 0 5%;

    & > ${StyledWeatherTag} {
        margin: 0 12px;
    }
`;

export interface TemperatureSummaryProps {
    weather: string
    feelsLike: number
    currentTemperature: number
    currentDayPeriods: Array<ShortDayStatistic>,
    weatherCode: string
}

const TemperatureSummary: React.FC<TemperatureSummaryProps> = ({
    weather,
    feelsLike,
    currentTemperature,
    currentDayPeriods,
    weatherCode
}) => {
    const WeatherIcon = WeatherIcons[weatherCode];
    return (
        <>
            <SmallSummaryWeather>
                <WeatherWithIcon>
                    <IconContainer size="xl"><WeatherIcon /></IconContainer>
                    <span>{weather}</span>
                </WeatherWithIcon>
                <div>
                    Feels like
                    {' '}
                    {feelsLike}
                    °
                </div>
            </SmallSummaryWeather>
            <DaySummaryWeather>
                <CurrentTemperature>
                    {currentTemperature}
                    °
                </CurrentTemperature>

                {currentDayPeriods && currentDayPeriods.map((day) => (
                    <WeatherTag
                        key={day.weatherCode}
                        weatherCode={day.weatherCode}
                        temperature={day.temperature}
                        timeInText={day.timePeriod}
                    />
                ))}
            </DaySummaryWeather>
        </>
    );
};

export default TemperatureSummary;
