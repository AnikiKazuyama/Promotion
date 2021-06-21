import styled from 'styled-components';
import { StyledToggleButtonContent } from 'app/Weather/components/elemets/ToggleButton';
import { BaseButton } from '../Button';

export const StyeldButtonGroup = styled.div`
    display: inline-flex;
    border-radius: 18px;
    vertical-align: middle;

    & > label > ${StyledToggleButtonContent},
    & > ${BaseButton} {
        flex: 1 0 auto;
        border-radius: 18px;
    }

    & > label > ${StyledToggleButtonContent}:focus,
    & > ${BaseButton}:focus {
        z-index: 1;
    }

    & > label:not(:first-child) > ${StyledToggleButtonContent},
    & > ${BaseButton}:not(:first-child) {
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
    }

    & > label:not(:last-child) > ${StyledToggleButtonContent},
    & > ${BaseButton}:not(:last-child) {
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    & > label:not(:last-child) > ${StyledToggleButtonContent},
    & > ${BaseButton}:not(:last-child) {
        border-right: 1px solid #c4c4c4;
    }

    & >:not(:first-child) label > ${StyledToggleButtonContent}
    & > ${BaseButton}:not(:first-child) {
        margin-left: -1px;
    }
`;

export default StyeldButtonGroup;
