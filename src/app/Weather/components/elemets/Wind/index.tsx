import degreeToDirection from 'app/Weather/utils/wind';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Button from '../Button';

type WindProps = {
    deg: number
    power: number
    vertical?: boolean
    className?: string
}

export const StyledWindDirection = styled(Button)`
    background-color: transparent;
    border-radius: 16px;
`;

const StyledWind = styled.div<{vertical?: boolean}>`
    display: flex;
    flex-direction: ${({ vertical }) => (vertical ? 'column' : 'row')};
    align-items: ${({ vertical }) => (vertical ? 'initial' : 'center')};
    justify-content: center;
    ${({ vertical }) => (vertical ? '' : 'margin: 0 8px;')};
    
    ${StyledWindDirection} {
        ${({ vertical }) => (vertical ? '' : 'margin: 0 8px;')};
        margin-top: ${({ vertical }) => (vertical ? '12px' : '0px')}
    }
`;

const Wind: React.FC<WindProps> = ({
    deg,
    power,
    vertical,
    className
}) => {
    const { t } = useTranslation();

    return (
        <StyledWind vertical={vertical} className={className}>
            <span>
                {power}
                {' '}
                м\с
            </span>
            <StyledWindDirection>{t(degreeToDirection(deg) || '')}</StyledWindDirection>
        </StyledWind>
    );
};

export default Wind;
