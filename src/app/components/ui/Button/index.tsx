import { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import IconWrapper from 'app/components/ui/IconContainer';

export const ButtonStyle = css`
    display: inline-flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    padding: 8px 12px;
    background-color: var(--colors-active-background);
    color: var(--colors-font-main);
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    min-width: 40px;
    transition: 0.3s background-color, color 0.3s;

    &:hover {
        cursor: pointer;
        background: var(--colors-main-background-darken);
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px #cbd6ee;
    }

    &:disabled {
        background-color: #6c7589;
        color: white;
    }
`;

export const BaseButton = styled.button`
    ${ButtonStyle}
`;

const IconContainer = styled(IconWrapper)`
    display: inline-flex;
    vertical-align: inherit;
`;

const IconContainerStart = styled(IconContainer)`
    margin-right: 12px;
`;

const IconContainerEnd = styled(IconContainer)`
    margin-left: 12px;
`;
export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    startIcon?: JSX.Element
    endIcon?: JSX.Element
    className?: string
    name?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    startIcon,
    endIcon,
    className,
    children,
    ...rest
}, ref) => (
    <BaseButton
        ref={ref}
        className={className}
        {...rest}
    >
        {startIcon ? <IconContainerStart size="xs">{startIcon}</IconContainerStart> : null }
        {children}
        {endIcon ? <IconContainerEnd size="xs">{endIcon}</IconContainerEnd> : null }
    </BaseButton>
));

export default Button;
