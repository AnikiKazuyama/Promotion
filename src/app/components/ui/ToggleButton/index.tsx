import { uniqueId } from 'lodash';
import { ChangeEventHandler, HTMLAttributes, useRef } from 'react';
import styled from 'styled-components';
import { BaseButton, ButtonProps } from '../Button';

type ToggleButtonType = 'checkbox' | 'radio'

export type ToggleButton<AttributeElementProps = ButtonProps> = {
    name?: string
    checked?: boolean
    type?: ToggleButtonType
    onChange?: ChangeEventHandler<HTMLInputElement>
    value: string
} & Omit<AttributeElementProps, 'onChange'>;

const StyledHiddenInput = styled.input`
    position: absolute;
    opacity: 0;
`;

const StyledToggleButton = styled(BaseButton)<{checked?: boolean}>`
    && {
        ${({ checked }) => (checked ? 'background-color: var(--colors-active-borders)' : '')}
    }
`;

const ToggleButton: React.FC<ToggleButton<HTMLAttributes<HTMLLabelElement>>> = ({
    children,
    checked,
    defaultChecked,
    name,
    value,
    type = 'radio',
    onChange,
    ...rest
}) => {
    const id = uniqueId();
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <StyledToggleButton
            as="label"
            htmlFor={id}
            checked={inputRef.current?.checked || false}
            {...rest}
        >
            <StyledHiddenInput
                id={id}
                name={name}
                checked={checked}
                defaultChecked={defaultChecked}
                type={type}
                onChange={onChange}
                value={value}
                ref={inputRef}
            />
            <span>{children}</span>
        </StyledToggleButton>
    );
};

export default ToggleButton;
