import styled from 'styled-components';

const StyledMain = styled.main`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export const Main: React.FC = ({ children }) => (
    <StyledMain>
        {children}
    </StyledMain>
);
export default Main;
