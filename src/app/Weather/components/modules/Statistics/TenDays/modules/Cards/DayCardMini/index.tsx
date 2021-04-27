import Divider from 'app/Weather/components/elemets/Divider';
import IconContainer from 'app/Weather/components/elemets/IconContainer';
import WeatherIcons from 'app/Weather/components/elemets/WeatherTag/icons';
import styled from 'styled-components';
import { StyledWeatherTag, WeatherTag } from 'app/Weather/components/elemets/WeatherTag';
import { animated } from 'react-spring';
import { themeTransitioned } from 'app/common/styles/mixins';
import { useLocation } from 'app/Weather/context/location';
import { observer } from 'mobx-react-lite';
import { ShortDayStatistic } from '../../../../types';

export type DayCardMiniProps = {
    date: string | number,
    currentDayPeriods: Array<ShortDayStatistic>,
    weatherCode: string,
    className?: string
}

export const DayCardMiniContainer = styled.div`
    min-width: 420px;
    
    font-size: 16px;
    font-weight: 600;
`;

export const Header = styled(animated.div)`
    /* margin-bottom: 12px; */
`;

export const DayOfTheWeek = styled.div``;
export const DayOfTheMonth = styled.div`
    font-size: 12px;
    color: var(--colors-font-secondary);
    ${themeTransitioned()}
`;
export const Content = styled(animated.div)``;

export const DayPeriodSummary = styled(animated.div)`
    display: flex;
    justify-content: flex-start;

    & > ${StyledWeatherTag}:not(:last-child) {
        margin-right: 50px;
    }
`;

export const DayCardMini: React.FC<DayCardMiniProps> = observer(({
    date,
    currentDayPeriods,
    weatherCode,
    className
}) => {
    const WeatherIcon = WeatherIcons[weatherCode];
    const locationStore = useLocation();

    return (
        <DayCardMiniContainer className={className}>
            <Header>
                <DayOfTheWeek>{locationStore.getTimeInLocation(date).format('dddd')}</DayOfTheWeek>
                <DayOfTheMonth>{locationStore.getTimeInLocation(date).format('D MMMM')}</DayOfTheMonth>
            </Header>
            <Content>
                <IconContainer size="xl"><WeatherIcon /></IconContainer>
            </Content>
            <Divider gap="12px 0px" />
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
        </DayCardMiniContainer>
    );
});

export default DayCardMini;
