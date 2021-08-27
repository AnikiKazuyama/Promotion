import styled from 'styled-components';
import { BaseButton } from '../Button';

export const StyeldButtonGroup = styled.div`
    display: inline-flex;
    border-radius: 18px;
    vertical-align: middle;

    & > ${BaseButton} {
        flex: 1 0 auto;
        border-radius: 18px;
    }

    & > ${BaseButton}:focus {
        z-index: 1;
    }

    & > ${BaseButton}:not(:first-child) {
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
    }

    & > ${BaseButton}:not(:last-child) {
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    & > ${BaseButton}:not(:first-child) {
        margin-left: -1px;
    }
`;

export default StyeldButtonGroup;
