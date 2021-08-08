import { AnyType } from 'app/common/types';
import IconContainer from 'app/Weather/components/elemets/IconContainer';
import WeatherIcons from 'app/Weather/components/elemets/WeatherTag/icons';
import { WeatherIconsId } from 'app/Weather/services/types/common';
import { animated } from 'react-spring';
import styled from 'styled-components';

type DayCardMiniMainProps = {
    weatherCode: WeatherIconsId
    weather: string
    style?: AnyType
}

const StyledDayCardMiniMain = styled(animated.div)`
    display: flex;
    align-items: center;
    margin: 24px 0px;
`;

const Weather = styled.span`
    margin-left: 8px;
`;

export const DayCardMiniMain: React.FC<DayCardMiniMainProps> = ({
    weatherCode,
    weather,
    style
}) => {
    const WeatherIcon = WeatherIcons[weatherCode];
    return (
        <StyledDayCardMiniMain style={style}>
            <IconContainer size="xl"><WeatherIcon /></IconContainer>
            <Weather>{weather}</Weather>
        </StyledDayCardMiniMain>
    );
};

export default DayCardMiniMain;
