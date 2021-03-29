import degreeToDirection from 'app/Weather/utils/wind';
import styled from 'styled-components';
import Button from '../Button';

type WindProps = {
    deg: number,
    power: number
}

const StyledWind = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const StyledWindDirection = styled(Button)`
    background-color: transparent;
    border-radius: 16px;
    margin-top: 12px;
`;

const Wind: React.FC<WindProps> = ({
    deg,
    power
}) => (
    <StyledWind>
        <span>
            {power}
            {' '}
            м\с
        </span>
        <StyledWindDirection>{degreeToDirection(deg)}</StyledWindDirection>
    </StyledWind>
);

export default Wind;
