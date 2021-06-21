import styled from 'styled-components';
import { animated } from 'react-spring';
import { themeTransitioned } from 'app/common/styles/mixins';
import { ConfigType } from 'dayjs';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'app/Weather/context/location';

export const StyledDayCardMiniHeader = styled(animated.div)`
    /* margin-bottom: 12px; */
`;
export const DayOfTheWeek = styled.div`
    margin-bottom: 4px;
`;
export const DayOfTheMonth = styled.div`
    font-size: 12px;
    color: var(--colors-font-secondary);
    ${themeTransitioned()}
`;

export type DayCardMiniHeaderProps = {
    date: ConfigType
}

const DayCardMiniHeader = observer<DayCardMiniHeaderProps>(({ date }) => {
    const locationStore = useLocation();

    return (
        <StyledDayCardMiniHeader>
            <DayOfTheWeek>{locationStore.getTimeInLocation(date).format('dddd')}</DayOfTheWeek>
            <DayOfTheMonth>{locationStore.getTimeInLocation(date).format('D MMMM')}</DayOfTheMonth>
        </StyledDayCardMiniHeader>
    );
});

export default DayCardMiniHeader;
