import { verticalAligned } from 'app/common/styles/mixins';
import IconContainer from 'app/Weather/components/elemets/IconContainer';
import { StyledWeatherTag, WeatherTag } from 'app/Weather/components/elemets/WeatherTag';
import WeatherIcons from 'app/Weather/components/elemets/WeatherTag/icons';
import styled from 'styled-components';
import { ShortDayStatistic } from '../../../../types';

export const SmallSummaryWeather = styled.div`
    ${verticalAligned()}
    justify-content: space-between;
`;

export const WeatherWithIcon = styled.div`
    ${verticalAligned()}
`;

export const CurrentTemperature = styled.span`
    margin: 0 auto;
    font-size: 82px;
    font-weight: 100;
    text-align: center;
`;

export const DaySummaryWeather = styled.div`
    ${verticalAligned()}
    justify-content: flex-start;

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
                    {currentTemperature.toFixed()}
                    °
                </CurrentTemperature>

                {currentDayPeriods && currentDayPeriods.map((day) => (
                    <WeatherTag
                        key={Math.random()}
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
