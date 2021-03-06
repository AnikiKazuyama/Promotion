import { verticalAligned } from 'app/common/style-helpers/mixins';
import IconContainer from 'app/components/ui/IconContainer';
import {
    Sunrise, Sunset
} from 'app/components/ui/WeatherTag/icons';
import { animated } from 'react-spring';
import styled from 'styled-components';
import WindComponent, { StyledWindDirection } from 'app/components/ui/Wind';
import { useLocation } from 'app/context/location';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import SunGraph from '../../SunGraph';
import { Wind } from '../../../types';

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
    const { t } = useTranslation();

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
            <table>
                <tbody>
                    <tr>
                        <td>
                            {t('wind')}
                            :
                        </td>
                        <td>
                            <WindComponent power={wind.power} deg={wind.direction} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {t('humidity')}
                        </td>
                        <td>
                            {humidity}
                            %
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {t('preassure')}
                        </td>
                        <td>
                            {preassure}
                            hPA
                        </td>
                    </tr>
                </tbody>
            </table>
        </StatisticSummary>
    );
});

export default StatisticsSummary;
