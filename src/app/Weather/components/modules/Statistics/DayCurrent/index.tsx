import Divider from 'app/Weather/components/elemets/Divider';
import IconContainer from 'app/Weather/components/elemets/IconContainer';
import { BlurBgPaper } from 'app/Weather/components/elemets/Paper';
import { WeatherTag } from 'app/Weather/components/elemets/WeatherTag';
import WeatherIcons from 'app/Weather/components/elemets/WeatherTag/icons';
import dayjs from 'dayjs';
import styled from 'styled-components';
import SunGraph from '../../SunGraph/one/SunGraph';

export type Wind = {
    direction: string
    power: string
}

export type ShortDayStatistic = {
    weatherCode: string
    timePeriod: string
    temperature: number
    humidity?: string
}

export type DayCurrentProps = {
    weatherCode: string,
    weather: string
    feelsLike: number
    currentTemperature: number
    currentDayPeriods: Array<ShortDayStatistic>
    wind: Wind
    humidity: string
    preassure: number
    sunset: string
    sunrise: string
    minTemperature: number
    maxTemperature: number
}

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
`;

const MinTemperature = styled.span`
    color: #bcbcbc;
`;

const SmallSummaryWeather = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const DaySummaryWeather = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5%;
`;

const WeatherWithIcon = styled.div`
    display: flex;
    align-items: center;
`;

const CurrentTemperature = styled.span`
    font-size: 82px;
    font-weight: 100;
`;

const DayCurrentContainer = styled(BlurBgPaper)`
    min-width: 400px;
    font-size: 16px;
    font-weight: 600;

    ${DaySummaryWeather} + ${Divider} {
        margin: 24px 0;
    }
`;

export const DayCurrent: React.FC<DayCurrentProps> = ({
    weather,
    feelsLike,
    currentTemperature,
    currentDayPeriods,
    minTemperature,
    maxTemperature,
    weatherCode
}) => {
    const WeatherIcon = WeatherIcons[weatherCode];
    return (
        <DayCurrentContainer>
            <Title>
                <div>
                    Now:
                    {' '}
                    {dayjs().format('HH:mm')}
                </div>
                <div>
                    {maxTemperature}
                    {' '}
                    \
                    {' '}
                    <MinTemperature>{minTemperature}</MinTemperature>
                </div>
            </Title>
            <Divider />
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

                {currentDayPeriods.map((day) => (
                    <WeatherTag
                        weatherCode={day.weatherCode}
                        temperature={day.temperature}
                        timeInText={day.timePeriod}
                    />
                ))}
            </DaySummaryWeather>
            <Divider />
            <div style={{ width: '50%' }}>
                <SunGraph />
            </div>
        </DayCurrentContainer>
    );
};
export default DayCurrent;
