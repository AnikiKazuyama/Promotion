import { verticalAligned } from 'app/common/styles/mixins';
import IconContainer from 'app/Weather/components/elemets/IconContainer';
import {
    Sunrise, Sunset
} from 'app/Weather/components/elemets/WeatherTag/icons';
import { animated } from 'react-spring';
import styled from 'styled-components';
import WindComponent, { StyledWindDirection } from 'app/Weather/components/elemets/Wind';
import { useLocation } from 'app/Weather/context/location';
import { observer } from 'mobx-react-lite';
import SunGraph from '../../SunGraph';
import { Wind } from '../../../../types';

export const SunInfo = styled.div`
    flex-grow: 2;
    margin-right: 40px;
`;

export const StatisticSummary = styled(animated.div)`
    ${verticalAligned()}
    justify-content: center;
`;

export const SunTime = styled.div`
    ${verticalAligned()}
    justify-content: space-around;
`;

export const SunTimeItem = styled.div`
    ${verticalAligned()}
`;

export const Statistics = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    flex-grow: 1;
`;

export const StatisticsItem = styled.div`
    ${verticalAligned()}
    
    margin-bottom: 12px;

    &:last-child {
        margin-bottom: 0px;
    }

    ${StyledWindDirection} {
        cursor: initial;
        outline: none;
    }
`;

export interface StatisticsSummaryProps {
    sunset: number
    sunrise: number
    wind: Wind
    humidity: number
    preassure: number
}

const StatisticsSummary: React.FC<StatisticsSummaryProps> = observer(({
    sunrise,
    sunset,
    wind,
    humidity,
    preassure
}) => {
    const locationStore = useLocation();
    return (
        <StatisticSummary>
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
                    <WindComponent power={wind.power} deg={wind.direction} />
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
                    hPA
                </StatisticsItem>
            </Statistics>
        </StatisticSummary>
    );
});

export default StatisticsSummary;
