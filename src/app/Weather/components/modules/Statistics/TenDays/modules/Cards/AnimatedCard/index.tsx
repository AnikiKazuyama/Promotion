import { BlurBgPaper } from 'app/Weather/components/elemets/Paper';
import styled from 'styled-components';
import Divider from 'app/Weather/components/elemets/Divider';
import AnimatedCardHeader from './Header';
import AnimatedCardMain from './Main';
import AnimatedCardFooter from './Footer';
import { DayCardProps } from '../DayCard';

export const AnimatedDayCardContainer = styled(BlurBgPaper)`
    min-width: 540px;
    font-size: 16px;
    font-weight: 600;
    overflow: hidden;
`;

export interface AnimatedDayCardProps extends DayCardProps {
    fullMode: boolean
}

export const AnimatedDayCard: React.FC<AnimatedDayCardProps> = ({
    dt,
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
    className,
    fullMode,
    today
}) => (
    <AnimatedDayCardContainer className={className}>
        <AnimatedCardHeader
            today={today}
            fullMode={fullMode}
            maxTemperature={maxTemperature}
            minTemperature={minTemperature}
            time={dt}
        />
        {fullMode ? <Divider gap="16px 0px 6px 0px" /> : null }
        <AnimatedCardMain
            weather={weather}
            feelsLike={feelsLike}
            currentTemperature={currentTemperature}
            currentDayPeriods={currentDayPeriods}
            weatherCode={weatherCode}
            fullMode={fullMode}
            date={dt}
        />
        {fullMode ? <Divider gap="16px 0px 24px 0px" /> : <Divider gap="12px 0px" />}
        <AnimatedCardFooter
            sunrise={sunrise}
            sunset={sunset}
            wind={wind}
            humidity={humidity}
            preassure={preassure}
            currentDayPeriods={currentDayPeriods}
            fullMode={fullMode}
        />
    </AnimatedDayCardContainer>

);
export default AnimatedDayCard;
