import { uniqueId } from 'lodash';
import { ChangeEventHandler } from 'react';
import styled from 'styled-components';
import { ButtonStyle, ButtonProps } from '../Button';

type ToggleButtonType = 'checkbox' | 'radio'

export type ToggleButton = {
    checked?: boolean
    type?: ToggleButtonType
    onChange?: ChangeEventHandler<HTMLInputElement>
} & Omit<ButtonProps, 'onChange'>;

const StyledHiddenInput = styled.input`
    position: absolute;
    opacity: 0;

    &:checked + span {
        background-color: red;
    }
`;

export const StyledToggleButtonContent = styled.span`
    ${ButtonStyle}
`;

const ToggleButton: React.FC<ToggleButton> = ({
    children, checked, name, type = 'checkbox', onChange, ...rest
}) => {
    const id = uniqueId();

    return (
        <label htmlFor={id}>
            <StyledHiddenInput
                id={id}
                name={name}
                checked={checked}
                type={type}
                onChange={onChange}
            />
            <StyledToggleButtonContent {...rest}>{children}</StyledToggleButtonContent>
        </label>
    );
};

export default ToggleButton;
