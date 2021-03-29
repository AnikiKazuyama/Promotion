import styled from 'styled-components';
import ActiveLink from '../../elemets/Link';
import Wrapper from '../Wrapper';

const StyledMain = styled.main`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

type TabProps = {
    isActive?: boolean
}

const Tab = styled.div<TabProps>`
    display: inline-flex;
    padding: 12px;
    border-bottom: ${({ isActive }) => (isActive ? '2px solid var(--colors-active-borders)' : '2px solid transparent')};
    font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
    cursor: pointer;
`;

const TabsListDivider = styled.span`
    margin: 0px 18px;
`;

export const Main: React.FC = ({ children }) => (
    <StyledMain>
        <Wrapper>
            <ActiveLink href="/weather"><Tab>short</Tab></ActiveLink>
            <TabsListDivider />
            <ActiveLink href="/weather/full"><Tab>full</Tab></ActiveLink>
        </Wrapper>
        {children}
    </StyledMain>
);
export default Main;
