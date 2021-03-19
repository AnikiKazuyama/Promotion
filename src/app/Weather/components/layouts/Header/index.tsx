import styled from 'styled-components';
import Hr from '../../elemets/Divider';
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
    display: flex;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: #fbfbfb;
`;
const TitleWLogo = styled.div`
    display: flex;
    align-items: center;
    margin-right: 40px;
    cursor: default;
`;
const Title = styled.div`
    margin-right: 8px;
    font-weight: bold;
`;
const Logo = styled.div`
    padding: 4px 8px;
    border: 3px solid #fdd84a;
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
    
    &:hover {
        color: white;
        opacity: 1;
    }
`;

/**
 * Header contains title, logo of the app
 * city search input and theme toggle
 */
export const Header: React.FC = () => (
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
                <CategoryItem>На 10 дней</CategoryItem>
                <CategoryItem>На месяц</CategoryItem>
                <CategoryItem>На карте</CategoryItem>
            </Categories>
            <ThemeToggle />
        </StyledHeader>
        <Hr />
    </>
);

export default Header;
