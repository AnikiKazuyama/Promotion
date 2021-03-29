import { verticalAligned } from 'app/common/styles/mixins';
import styled from 'styled-components';
import Wrapper from '../Wrapper';

export const StyledFooter = styled.footer`
    ${verticalAligned()}
    margin-top: 20px;
    padding-bottom: 20px;
`;

export const FooterLits = styled.ul`
    display: flex;
    margin-right: auto;
`;

export const Footer = () => (
    <Wrapper>
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
