import { BlurBgPaper } from 'app/Weather/components/elemets/Paper';
import styled from 'styled-components';
import Divider from 'app/Weather/components/elemets/Divider';

import { useFade } from 'app/common/hooks/animations/fade';
import { animated } from 'react-spring';
import { DayCardProps } from '../DayCard';
import Header from '../DayCard/Header';
import HeaderMini from '../DayCardMini/Header';
import TemperatureSummary from '../DayCard/TemperatureSummary';
import MainMini from '../DayCardMini/Main';
import StatisticsSummary from '../DayCard/StatisticsSummary';
import FooterMini from '../DayCardMini/Footer';

export const AnimatedDayCardContainer = styled(animated(BlurBgPaper))`
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
}) => {
    const fadeTransition = useFade(fullMode);
    return (
        <AnimatedDayCardContainer className={className}>
            {
                fadeTransition((styles, item) => (item ? (
                    <Header
                        today={today}
                        maxTemperature={maxTemperature}
                        minTemperature={minTemperature}
                        time={dt}
                    />
                ) : (
                    <HeaderMini date={dt} />
                )))
            }
            {fullMode ? <Divider gap="16px 0px 6px 0px" /> : null }
            {
                fullMode ? (
                    <TemperatureSummary
                        weather={weather}
                        feelsLike={feelsLike}
                        currentTemperature={currentTemperature}
                        currentDayPeriods={currentDayPeriods}
                        weatherCode={weatherCode}
                    />
                ) : (
                    <MainMini weatherCode={weatherCode} weather={weather} />
                )
            }
            {fullMode ? <Divider gap="16px 0px 24px 0px" /> : <Divider gap="12px 0px" />}
            {fullMode ? (
                <StatisticsSummary
                    sunset={sunset}
                    sunrise={sunrise}
                    wind={wind}
                    preassure={preassure}
                    humidity={humidity}
                />
            ) : (
                <FooterMini currentDayPeriods={currentDayPeriods} />
            )}
        </AnimatedDayCardContainer>

    );
};
export default AnimatedDayCard;
