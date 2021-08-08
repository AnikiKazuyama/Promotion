import Divider from 'app/Weather/components/elemets/Divider';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { ConfigType } from 'dayjs';
import { WeatherIconsId } from 'app/Weather/services/types/common';
import { ShortDayStatistic } from '../../../../types';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export type DayCardMiniProps = {
    date: ConfigType,
    currentDayPeriods: Array<ShortDayStatistic>,
    weatherCode: WeatherIconsId,
    weather: string,
    className?: string
}

export const DayCardMiniContainer = styled.div`
    min-width: 420px;
    
    font-size: 16px;
    font-weight: 600;
`;

export const DayCardMini: React.FC<DayCardMiniProps> = observer(({
    date,
    currentDayPeriods,
    weatherCode,
    weather,
    className
}) => (
    <DayCardMiniContainer className={className}>
        <Header date={date} />
        <Main weatherCode={weatherCode} weather={weather} />
        <Divider gap="12px 0px" />
        <Footer currentDayPeriods={currentDayPeriods} />
    </DayCardMiniContainer>
));

export default DayCardMini;
