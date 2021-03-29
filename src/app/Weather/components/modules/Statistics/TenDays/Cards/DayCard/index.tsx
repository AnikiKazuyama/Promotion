import Divider from 'app/Weather/components/elemets/Divider';
import styled from 'styled-components';
import Header from './Header';
import StatisticsSummary from './StatisticsSummary';
import TemperatureSummary from './TemperatureSummary';
import { ShortDayStatistic, Wind } from '../../../types';

export interface DayCardProps {
    currentDayPeriods: Array<ShortDayStatistic>
    currentTemperature: number
    feelsLike: number
    humidity: number
    maxTemperature: number
    minTemperature: number
    preassure: number
    sunrise: number
    sunset: number
    weather: string
    weatherCode: string
    wind: Wind
    className?: string
}

export const DayCardContainer = styled.div`
    min-width: 540px;
    font-size: 16px;
    font-weight: 600;
`;

export const DayCard: React.FC<DayCardProps> = ({
    currentDayPeriods,
    currentTemperature,
    feelsLike,
    humidity,
    maxTemperature,
    minTemperature,
    preassure,
    sunrise,
    sunset,
    weather,
    weatherCode,
    wind,
    className
}) => (
    <DayCardContainer className={className}>
        <Header
            maxTemperature={maxTemperature}
            minTemperature={minTemperature}
        />
        <Divider gap="16px 0px 6px 0px" />
        <TemperatureSummary
            weather={weather}
            feelsLike={feelsLike}
            currentTemperature={currentTemperature}
            currentDayPeriods={currentDayPeriods}
            weatherCode={weatherCode}
        />
        <Divider gap="16px 0px 24px 0px" />
        <StatisticsSummary
            sunset={sunset}
            sunrise={sunrise}
            wind={wind}
            preassure={preassure}
            humidity={humidity}
        />
    </DayCardContainer>
);
export default DayCard;
