import { createGlobalStyle, css } from 'styled-components';

const globalStyles = css`

* {
    box-sizing: border-box;
}

:root {
    // Light theme colors

    // Active card background-color, chart dots rounds
    --color-white: #fff;
    // Main forn color
    --color-black: #191919;
    // Main background color
    --color-gray: #f3f3f3;
    // Not active card background-color
    --color-light-gray: #f9f9f9;
    // Not primary font color
    --color-deep-gray: #959595;
    // Toggle slider background
    --color-dark-gray: #c9c9c9;
    // Wet font color and clouds
    --color-blue: #8aa8de;
    // Active charts bars, chart dots, primary areaClosed lines
    --color-blue-contrast: #8ecafe;
    // Secondary AreaClosed background
    --color-blue-light: #cae3f9;
    // Active tabs borders, suns
    --color-yellow: #fd5;

    // Dark theme colors

    --color-blue-dark: #1d2532;
    --color-deep-blue-dark: #273343;
    --color-blue-dark-light: #576a85;
    --color-inknown-gray: #e7e7e7; 

}

.html, #__next {
    height: 100%;
}

body[data-theme='light'] {
    --colors-header-background: var(--color-light-gray);
    --colors-main-background: var(--color-gray);
    --colors-active-background: var(--color-white);
    --colors-divider: var(--color-inknown-gray);
    --colors-not-active-background: var(--color-light-gray);
    --colors-chart-dots-rounds: var(--color-white);
    --colors-chart-dots-background: var(--color-blue-contrast);
    --colors-chart-lines-primary: var(--color-blue-contrast);
    --colors-chart-fill-primary: var(--color-blue-light);
    --colors-chart-bar-fill-primary: var(--color-blue-contrast);
    --colors-chart-bar-fill-secondary: var(--color-blue-light);
    --colors-font-main: var(--color-black);
    --colors-font-secondary: var(--color-deep-gray);
    --colors-font-wet: var(--color-blue);
    --colors-clouds: var(--color-wet);
    --colors-sun: var(--color-yellow);
    --colors-toggle-slider: var(--color-dark-gray);
    --colors-active-borders: var(--color-yellow);
}

body[data-theme='dark'] {
    --colors-header-background: #1a1e29;
    --colors-main-background: #283345;
    --colors-active-background: linear-gradient(#617492, #b1b0b6);
    --colors-not-active-background: linear-gradient(#707c96, #818086);
    --colors-chart-dots-rounds: var(--color-white);
    --colors-chart-dots-background: var(--color-white);
    --colors-chart-lines-primary: var(--color-white);
    --colors-chart-fill-primary: #b0bac4;
    --colors-chart-bar-fill-primary: #b3bcc5;
    --colors-chart-bar-fill-secondary: #b0bac4;
    --colors-font-main: var(--color-white);
    --colors-font-secondary: var(--color-white);
    --colors-font-wet: var(--color-blue);
    --colors-clouds: var(--color-white);
    --colors-sun: var(--color-white);
    --colors-toggle-slider: #b0bac4;
    --colors-active-borders: var(--color-white);
}

.body {
    flex-grow: 1;
}

.html {
    display: flex;
    flex-direction: column;
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

img { 
    display: block;
}

.transparent-marker {
    width: 0px;
    height: 0px;
    position: absolute;
    z-index: -1;
}

.leaflet-div-icon {
    background-color: transparent;
    border: none;
}
`;

export default globalStyles;
export const StylesGlobal = createGlobalStyle`${globalStyles}`;
