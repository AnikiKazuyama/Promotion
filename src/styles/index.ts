import { createGlobalStyle } from 'styled-components';
import globalStyles from './Global';
import normalizeStyles from './Normalize';

export { globalStyles, normalizeStyles };
export default createGlobalStyle`
    ${normalizeStyles}

    ${globalStyles}
`;
