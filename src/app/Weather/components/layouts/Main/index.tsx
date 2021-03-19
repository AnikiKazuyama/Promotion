import styled from 'styled-components';
import Wrapper from '../Wrapper';

const StyledMain = styled(Wrapper).attrs({
    as: 'main'
})`
    flex-grow: 1;
`;

export const Main: React.FC = ({ children }) => (
    <StyledMain>{children}</StyledMain>
);
export default Main;
