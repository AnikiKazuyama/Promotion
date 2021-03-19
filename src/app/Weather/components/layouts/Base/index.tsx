import styled from 'styled-components';
import Footer from '../Footer';
import Header from '../Header';
import Main from '../Main';

const StyledBaseLayout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    /* background: linear-gradient(170deg, #355c7d, #6c5b7b, #c06c84); */
    background-color: #f3f3f3;
    color: black;
`;

export const BaseLayout: React.FC = ({ children }) => (
    <StyledBaseLayout>
        <Header />
        <Main>{children}</Main>
        <Footer />
    </StyledBaseLayout>
);
export default BaseLayout;
