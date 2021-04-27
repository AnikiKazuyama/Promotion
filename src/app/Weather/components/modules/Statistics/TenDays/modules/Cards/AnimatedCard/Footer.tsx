import { useFade } from 'app/common/hooks/animations/fade';
import IconContainer from 'app/Weather/components/elemets/IconContainer';
import { WeatherTag } from 'app/Weather/components/elemets/WeatherTag';
import {
    Rain,
    Sunrise,
    Sunset
} from 'app/Weather/components/elemets/WeatherTag/icons';

import { useLocation } from 'app/Weather/context/location';
import { observer } from 'mobx-react-lite';
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
import { ShortDayStatistic } from '../../../../types';

interface AnimatedDayFooterProps extends StatisticsSummaryProps{
    fullMode: boolean
    sunset: number
    sunrise: number
    currentDayPeriods: Array<ShortDayStatistic>
}

const AnimatedCardFooter: React.FC<AnimatedDayFooterProps> = observer(({
    sunrise,
    sunset,
    wind,
    humidity,
    preassure,
    currentDayPeriods,
    fullMode
}) => {
    const transitions = useFade(fullMode);
    const locationStore = useLocation();

    return (
        <>
            {transitions.map(({ item, key, props }) => (fullMode
                ? (
                    <StatisticSummary key={key} style={props}>
                        <SunInfo>
                            <SunTime>
                                <SunTimeItem>
                                    <IconContainer size="m"><Sunrise /></IconContainer>
                                    <span>{locationStore.getTimeInLocation(sunrise).format('HH:mm') }</span>
                                </SunTimeItem>
                                <SunTimeItem>
                                    <IconContainer size="m"><Sunset /></IconContainer>
                                    <span>{locationStore.getTimeInLocation(sunset).format('HH:mm') }</span>
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
                                key={Math.random()}
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
});

export default AnimatedCardFooter;
