import { themeTransitioned } from 'app/common/styles/mixins';
import styled from 'styled-components';

type DividerProps = {
    gap?: string
}

export const Divider = styled.hr<DividerProps>`
    margin: ${({ gap }) => gap || '0px'};
    height: 1px;
    border: none;
    background-color: var(--colors-divider);

    ${themeTransitioned()}
`;
export default Divider;
