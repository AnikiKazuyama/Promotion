import Toggle from 'app/Weather/components/elemets/Toggle';
import styled from 'styled-components';

const StyledToggle = styled(Toggle)`
    margin: 0 20px;
`;

const ThemeToggle = () => (
    <>
        <span>White</span>
        <StyledToggle />
        <span>Black</span>
    </>
);
export default ThemeToggle;
