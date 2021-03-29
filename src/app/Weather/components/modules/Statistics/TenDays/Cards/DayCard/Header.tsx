import { themeTransitioned } from 'app/common/styles/mixins';
import dayjs from 'dayjs';
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
    maxTemperature: number,
    minTemperature: number
}

const Header: React.FC<DayCurrentHeaderProps> = ({
    maxTemperature,
    minTemperature
}) => (
    <Title>
        <div>
            Now:
            {' '}
            {dayjs().format('HH:mm')}
        </div>
        <div>
            {maxTemperature}
            {' '}
            \
            {' '}
            <MinTemperature>{minTemperature}</MinTemperature>
        </div>
    </Title>
);

export default Header;
