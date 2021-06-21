import { forwardRef } from 'react';
import styled, { css } from 'styled-components';

export const ButtonStyle = css`
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    justify-content: center;
    padding: 8px 12px;
    background-color: var(--colors-active-background);
    color: var(--colors-font-main);
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    min-width: 40px;
    transition: 0.3s background-color, color 0.3s;

    &:hover {
        cursor: pointer;
        background: #f5f5f5;
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

const IconContainer = styled.span`
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
        {startIcon ? <IconContainerStart>{startIcon}</IconContainerStart> : null }
        {children}
        {endIcon ? <IconContainerEnd>{endIcon}</IconContainerEnd> : null }
    </BaseButton>
));

export default Button;
