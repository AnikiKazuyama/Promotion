import { css } from 'styled-components';

export const verticalAligned = (verticalAlign = 'center', direction = 'row') => css`
    display: flex;
    flex-direction: ${direction};
    align-items: ${verticalAlign};
`;

export const themeTransitioned = () => css`
    transition: color 0.3s, background-color 0.3s, border-color 0.3s;
`;

export const stf = () => null;
