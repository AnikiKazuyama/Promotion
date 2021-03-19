import styled from 'styled-components';
import Hr from '../../elemets/Divider';
import Wrapper from '../Wrapper';

export const StyledFooter = styled.footer`
    display: flex;
    align-items: center;
    margin-top: 20px;
    padding-bottom: 20px;
`;

export const FooterLits = styled.ul`
    display: flex;
    margin-right: auto;
`;

export const Footer = () => (
    <Wrapper>
        <Hr />
        <StyledFooter>
            <FooterLits>
                <li>Главная</li>
                <li>Помощь</li>
            </FooterLits>

            <div>Все права за ичей</div>
        </StyledFooter>
    </Wrapper>
);
export default Footer;
