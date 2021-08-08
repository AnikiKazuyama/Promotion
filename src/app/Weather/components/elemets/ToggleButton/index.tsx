import { uniqueId } from 'lodash';
import { ChangeEventHandler } from 'react';
import styled from 'styled-components';
import { ButtonStyle, ButtonProps } from '../Button';

type ToggleButtonType = 'checkbox' | 'radio'

export type ToggleButton = {
    checked?: boolean
    type?: ToggleButtonType
    onChange?: ChangeEventHandler<HTMLInputElement>
    value: string
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
    children, checked, defaultChecked, name, value, type = 'radio', onChange, ...rest
}) => {
    const id = uniqueId();

    return (
        <label htmlFor={id}>
            <StyledHiddenInput
                id={id}
                name={name}
                checked={checked}
                defaultChecked={defaultChecked}
                type={type}
                onChange={onChange}
                value={value}
            />
            <StyledToggleButtonContent {...rest}>{children}</StyledToggleButtonContent>
        </label>
    );
};

export default ToggleButton;
