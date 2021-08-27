import { StyledWeatherTag, WeatherTag } from 'app/components/ui/WeatherTag';
import { animated } from 'react-spring';
import styled from 'styled-components';
import { ShortDayStatistic } from '../../../types';

type DayCardMiniFooterProps = {
    currentDayPeriods: Array<ShortDayStatistic>,
}

export const DayPeriodSummary = styled(animated.div)`
    display: flex;
    justify-content: flex-start;

    & > ${StyledWeatherTag}:not(:last-child) {
        margin-right: 50px;
    }
`;

const DayCardMiniFooter: React.FC<DayCardMiniFooterProps> = ({ currentDayPeriods }) => (
    <DayPeriodSummary>
        {currentDayPeriods.map((day) => (
            <WeatherTag
                key={day.timePeriod}
                weatherCode={day.weatherCode}
                timeInText={day.timePeriod}
                temperature={day.temperature}
            />
        ))}
    </DayPeriodSummary>
);

export default DayCardMiniFooter;
