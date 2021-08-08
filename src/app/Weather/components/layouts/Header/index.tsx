import { themeTransitioned, verticalAligned } from 'app/common/styles/mixins';
import { useLocation } from 'app/Weather/context/location';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Divider from '../../elemets/Divider';
import Geoposition from '../../modules/Geoposition';
import CitySearch from '../../modules/Inputs/CitySelect';
import ThemeToggle from '../../modules/Inputs/ThemeToggle';
import Wrapper from '../Wrapper';
import ActiveLink from '../../elemets/Link';

/**
 * Left part of header
 * It contains logo, title and city search input
 */
const StyledHeader = styled(Wrapper).attrs({
    as: 'header'
})`
    ${verticalAligned()}    
    ${themeTransitioned()}

    background-color: var(--colors-header-background);
`;
const TitleWLogo = styled.div`
    ${verticalAligned()}
    margin-right: 40px;
    cursor: pointer;
`;
const Title = styled.div`
    margin-right: 8px;
    font-weight: bold;
`;
const Logo = styled.div`
    padding: 4px 8px;
    border: 3px solid var(--colors-active-borders);
`;
const SearchBlock = styled.div`
    margin-right: 8px;
`;
const Categories = styled.ul`
    display: flex;
    flex-grow: 1;
    justify-content: space-evenly;
`;
const CategoryItem = styled.li<{isActive?: boolean}>`
    position: relative;
    padding: 36px;
    margin: 0 4px;
    text-transform: uppercase;
    transition: opacity 0.2s;
    cursor: pointer;
    font-weight: 600;

    ${({ isActive }) => ({
        opacity: isActive ? 1 : 0.5,
        color: isActive ? 'var(--colors-font-main)' : 'var(--colors-font-secondary)'
    })}

    &:after {
        content: '';
        display: ${({ isActive }) => (isActive ? 'block' : 'none')};
        position: absolute;
        bottom: 0px;
        width: 100%;
        left: 0px;
        border-bottom: 3px solid var(--colors-active-borders);
    }

    &:hover {
        color: var(--colors-font-main);
        opacity: 1;
    }
`;

/**
 * Header contains title, logo of the app
 * city search input and theme toggle
 */
export const Header = observer(() => {
    const locationStore = useLocation();
    const { query } = useRouter();
    const { t } = useTranslation();

    return (
        <>
            <StyledHeader>
                <Link href="/weather">
                    <TitleWLogo>
                        <Title>Aniki</Title>
                        <Logo>Weather</Logo>
                    </TitleWLogo>
                </Link>
                <SearchBlock>
                    <CitySearch />
                </SearchBlock>
                <Categories>
                    <ActiveLink href={`/weather/${query.city}`}><CategoryItem>{t('for number of days', { count: 5 })}</CategoryItem></ActiveLink>
                    <ActiveLink href={`/weather/map/${query.city}`}><CategoryItem>{t('on map')}</CategoryItem></ActiveLink>
                </Categories>
                <ThemeToggle />
            </StyledHeader>
            <Divider gap="0px 0px 24px 0px" />
            <Wrapper>
                <Geoposition title={locationStore.getLocation().city} />
                <Divider gap="24px 0px" />
            </Wrapper>
        </>
    );
});

export default Header;
