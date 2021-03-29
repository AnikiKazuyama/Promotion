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
`;

export interface AnimatedDayCardProps extends DayCardProps {
    date: string
    mode: string
}

export const AnimatedDayCard: React.FC<AnimatedDayCardProps> = ({
    date,
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
    mode
}) => (
    <AnimatedDayCardContainer className={className}>
        <AnimatedCardHeader
            mode={mode}
            maxTemperature={maxTemperature}
            minTemperature={minTemperature}
            date={date}
        />
        {mode === 'full' ? <Divider gap="16px 0px 6px 0px" /> : null }
        <AnimatedCardMain
            weather={weather}
            feelsLike={feelsLike}
            currentTemperature={currentTemperature}
            currentDayPeriods={currentDayPeriods}
            weatherCode={weatherCode}
            mode={mode}
            date={date}
        />
        {mode === 'full' ? <Divider gap="16px 0px 24px 0px" /> : <Divider gap="12px 0px" />}
        <AnimatedCardFooter
            sunrise={sunrise}
            sunset={sunset}
            wind={wind}
            humidity={humidity}
            preassure={preassure}
            currentDayPeriods={currentDayPeriods}
            mode={mode}
        />
    </AnimatedDayCardContainer>

);
export default AnimatedDayCard;
