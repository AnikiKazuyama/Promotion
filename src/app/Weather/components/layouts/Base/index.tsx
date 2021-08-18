import { themeTransitioned } from 'app/common/style-helpers/mixins';
import styled from 'styled-components';
import Divider from '../../elemets/Divider';
import Footer from '../Footer';
import Header from '../Header';
import Main from '../Main';

const StyledBaseLayout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--colors-main-background);
    color: var(--colors-font-main);

    ${themeTransitioned()}
`;

export const BaseLayout: React.FC = ({ children }) => (
    <StyledBaseLayout>
        <Header />
        <Main>{children}</Main>
        <Divider gap="24px 0" />
        <Footer />
    </StyledBaseLayout>
);
export default BaseLayout;
