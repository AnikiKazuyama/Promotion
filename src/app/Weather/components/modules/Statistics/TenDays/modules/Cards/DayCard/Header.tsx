import { themeTransitioned } from 'app/common/styles/mixins';
import { useLocation } from 'app/Weather/context/location';
import { observer } from 'mobx-react-lite';
import { animated } from 'react-spring';
import styled from 'styled-components';

export const Title = styled(animated.div)`
    display: flex;
    justify-content: space-between;
`;

export const MinTemperature = styled.span`
    color: var(--colors-font-secondary);
    ${themeTransitioned()}
`;

export interface DayCurrentHeaderProps {
    today: boolean,
    time: number,
    maxTemperature: number,
    minTemperature: number
}

const Header: React.FC<DayCurrentHeaderProps> = observer(({
    today,
    time,
    maxTemperature,
    minTemperature
}) => {
    const locationStore = useLocation();

    return (
        <Title>
            <div>
                {today ? 'Now:' : null}
                {
                    today
                        ? locationStore.getTimeInLocation().format('HH:mm')
                        : locationStore.getTimeInLocation(time).format('DD.MM')
                }
            </div>
            <div>
                {maxTemperature}
                {' '}
                \
                <MinTemperature>{minTemperature}</MinTemperature>
            </div>
        </Title>
    );
});

export default Header;
