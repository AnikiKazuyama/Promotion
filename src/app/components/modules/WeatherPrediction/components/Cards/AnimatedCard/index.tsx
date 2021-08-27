import { BlurBgPaper } from 'app/components/ui/Paper';
import styled from 'styled-components';
import Divider from 'app/components/ui/Divider';

import { animated, useSpring } from 'react-spring';
import { useEffect, useRef, useState } from 'react';
import { DayCardProps } from '../DayCard';
import Header from '../DayCard/Header';
import HeaderMini from '../DayCardMini/Header';
import TemperatureSummary from '../DayCard/TemperatureSummary';
import MainMini from '../DayCardMini/Main';
import StatisticsSummary from '../DayCard/StatisticsSummary';
import FooterMini from '../DayCardMini/Footer';

export const AnimatedDayCardContainer = styled(animated.div)`
    min-width: 540px;
    font-size: 16px;
    font-weight: 600;
    overflow: hidden;
`;

const cardAnimationConfig = {
    mass: 2.5,
    bounce: 2.3
};

export interface AnimatedDayCardProps extends DayCardProps {
    fullMode: boolean
}

export const AnimatedDayCard: React.FC<AnimatedDayCardProps> = ({
    weatherStat,
    className,
    fullMode,
    today
}) => {
    const [cardInnerHeigh, setCardInnerHeight] = useState<string | number>('auto');
    const cardInnerRef = useRef<HTMLDivElement>(null);
    const heightAnimation = useSpring({
        height: cardInnerHeigh,
        config: cardAnimationConfig
    });
    const {
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
        wind
    } = weatherStat;

    useEffect(() => {
        setCardInnerHeight(cardInnerRef.current?.offsetHeight || 0);
    }, [fullMode]);

    return (
        <BlurBgPaper>
            <AnimatedDayCardContainer className={className} style={heightAnimation}>
                <div ref={cardInnerRef}>
                    {
                        fullMode
                            ? (
                                <Header
                                    today={today}
                                    maxTemperature={maxTemperature}
                                    minTemperature={minTemperature}
                                    time={dt}
                                />
                            )
                            : <HeaderMini date={dt} />

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
                </div>
            </AnimatedDayCardContainer>
        </BlurBgPaper>
    );
};
export default AnimatedDayCard;
