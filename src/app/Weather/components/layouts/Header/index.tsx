import { themeTransitioned, verticalAligned } from 'app/common/styles/mixins';
import { useLocation } from 'app/Weather/context/location';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import Divider from '../../elemets/Divider';
import Geoposition from '../../modules/Geoposition';
import CitySearch from '../../modules/Inputs/CitySelect';
import ThemeToggle from '../../modules/Inputs/ThemeToggle';
import Wrapper from '../Wrapper';

/**
 * Left part of header
 * It contains logo, title and city search input
 */
const StyledHeader = styled(Wrapper).attrs({
    as: 'header'
})`
    ${verticalAligned()}
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: var(--colors-header-background);
    
    ${themeTransitioned()}
`;
const TitleWLogo = styled.div`
    ${verticalAligned()}
    margin-right: 40px;
    cursor: default;
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
    margin-right: auto;
`;
const CategoryItem = styled.li`
    padding: 0;
    margin: 0 4px;
    text-transform: uppercase;
    opacity: 0.5;
    transition: opacity 0.2s;
    cursor: pointer;
    color: var(--colors-font-secondary);

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

    return (
        <>
            <StyledHeader>
                <TitleWLogo>
                    <Title>Aniki</Title>
                    <Logo>Weather</Logo>
                </TitleWLogo>
                <SearchBlock>
                    <CitySearch />
                </SearchBlock>
                <Categories>
                    <CategoryItem>На 5 дней</CategoryItem>
                    <CategoryItem>На карте</CategoryItem>
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
