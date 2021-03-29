import { useFade } from 'app/common/hooks/animations/fade';
import IconContainer from 'app/Weather/components/elemets/IconContainer';
import { WeatherTag } from 'app/Weather/components/elemets/WeatherTag';
import {
    Rain,
    Sunrise,
    Sunset
} from 'app/Weather/components/elemets/WeatherTag/icons';
import dayjs from 'dayjs';

import SunGraph from '../../SunGraph/SunGraph';
import {
    Statistics,
    StatisticsItem,
    StatisticsSummaryProps,
    StatisticSummary,
    SunInfo,
    SunTime,
    SunTimeItem
} from '../DayCard/StatisticsSummary';
import { DayPeriodSummary } from '../DayCardMini';
import { ShortDayStatistic } from '../../../types';

interface AnimatedDayFooterProps extends StatisticsSummaryProps{
    mode: string
    sunset: string
    sunrise: string
    currentDayPeriods: Array<ShortDayStatistic>
}

const AnimatedCardFooter: React.FC<AnimatedDayFooterProps> = ({
    sunrise,
    sunset,
    wind,
    humidity,
    preassure,
    currentDayPeriods,
    mode
}) => {
    const transitions = useFade(mode);
    return (
        <>
            {transitions.map(({ item, key, props }) => (item === 'full'
                ? (
                    <StatisticSummary key={key} style={props}>
                        <SunInfo>
                            <SunTime>
                                <SunTimeItem>
                                    <IconContainer size="m"><Sunrise /></IconContainer>
                                    <span>{dayjs(sunrise).format('HH:mm') }</span>
                                </SunTimeItem>
                                <SunTimeItem>
                                    <IconContainer size="m"><Sunset /></IconContainer>
                                    <span>{dayjs(sunset).format('HH:mm') }</span>
                                </SunTimeItem>
                            </SunTime>
                            <SunGraph />
                        </SunInfo>
                        <Statistics>
                            <StatisticsItem>
                                Ветер:
                                {' '}
                                {wind.power}
                                {' '}
                                {wind.direction}
                            </StatisticsItem>
                            <StatisticsItem>
                                Влажность:
                                {' '}
                                {humidity}
                                %
                            </StatisticsItem>
                            <StatisticsItem>
                                Давление:
                                {' '}
                                {preassure}
                                %
                            </StatisticsItem>
                            <StatisticsItem>
                                <IconContainer><Rain /></IconContainer>
                                {' '}
                                {preassure}
                                %
                            </StatisticsItem>
                        </Statistics>
                    </StatisticSummary>
                )
                : (
                    <DayPeriodSummary key={key} style={props}>
                        {currentDayPeriods.map((day) => (
                            <WeatherTag
                                key={day.timePeriod}
                                weatherCode={day.weatherCode}
                                timeInText={day.timePeriod}
                                temperature={day.temperature}
                            />
                        ))}
                    </DayPeriodSummary>
                )
            ))}
        </>
    );
};

export default AnimatedCardFooter;
