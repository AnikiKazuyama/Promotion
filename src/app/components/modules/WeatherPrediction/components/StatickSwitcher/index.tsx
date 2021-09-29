import ActiveLink from 'app/components/ui/Link';
import Wrapper from 'app/components/layouts/Wrapper';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

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

const StaticSwitcher = () => {
    const { query } = useRouter();
    const { t } = useTranslation();

    return (
        <Wrapper>
            <ActiveLink href={`/${query.city}`}><Tab>{t('short')}</Tab></ActiveLink>
            <TabsListDivider />
            <ActiveLink href={`/full/${query.city}`}><Tab>{t('full')}</Tab></ActiveLink>
        </Wrapper>
    );
};

export default StaticSwitcher;
