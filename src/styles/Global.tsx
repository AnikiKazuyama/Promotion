import { createGlobalStyle, css } from 'styled-components';

const globalStyles = css`
.html, .body, #__next {
    height: 100%;
}
.html {
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
    font-weight: 400;
    font-size: 18px;
}

ul {
    padding: 0;
    margin: 0;
    list-style: none;
}

svg {
    display: block;
}
`;

export default globalStyles;
export const StylesGlobal = createGlobalStyle`${globalStyles}`;
