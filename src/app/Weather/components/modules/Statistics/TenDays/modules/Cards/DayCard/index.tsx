import Divider from 'app/Weather/components/elemets/Divider';
import styled from 'styled-components';
import { WeatherIconsId } from 'app/Weather/services/types/common';
import Header from './Header';
import StatisticsSummary from './StatisticsSummary';
import TemperatureSummary from './TemperatureSummary';
import { ShortDayStatistic, Wind } from '../../../../types';

export interface DayCardProps {
    today: boolean
    weatherStat: {
        dt: number
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
        weatherCode: WeatherIconsId
        wind: Wind
    }
    className?: string
}

export const DayCardContainer = styled.div`
    min-width: 540px;
    font-size: 16px;
    font-weight: 600;
`;

export const DayCard: React.FC<DayCardProps> = ({
    today,
    weatherStat,
    className
}) => (
    <DayCardContainer className={className}>
        <Header
            today={today}
            time={weatherStat.dt}
            maxTemperature={weatherStat.maxTemperature}
            minTemperature={weatherStat.minTemperature}
        />
        <Divider gap="16px 0px 6px 0px" />
        <TemperatureSummary
            weather={weatherStat.weather}
            feelsLike={weatherStat.feelsLike}
            currentTemperature={weatherStat.currentTemperature}
            currentDayPeriods={weatherStat.currentDayPeriods}
            weatherCode={weatherStat.weatherCode}
        />
        <Divider gap="16px 0px 24px 0px" />
        <StatisticsSummary
            sunset={weatherStat.sunset}
            sunrise={weatherStat.sunrise}
            wind={weatherStat.wind}
            preassure={weatherStat.preassure}
            humidity={weatherStat.humidity}
        />
    </DayCardContainer>
);
export default DayCard;
