import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { math } from 'polished';
import { themeTransitioned } from 'app/common/styles/mixins';

const Switch = styled.label`
    cursor: pointer;
`;

const sliderSize = {
    width: '40px',
    height: '20px'
};

const Slider = styled.span`
    display: block;
    position: relative;
    width: ${sliderSize.width};
    height: ${sliderSize.height};
    border-radius: ${sliderSize.height};
    background-color: var(--colors-toggle-slider);
    margin: 0;
    padding: 0;

    &::before {
        content: '';
        position: absolute;
        height: 26px;
        width: 26px;
        top: 50%;
        left: -1px;
        background-color: white;
        border-radius: 50%;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        transform: translateY(-50%);
        transition: left 0.2s;
    }
`;

const HideInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    position: absolute;
    appearance: none;

    ${themeTransitioned()}

    &:checked +  ${Slider} {
        background-color: var(--colors-toggle-slider);
    }

    &:checked +  ${Slider}::before {
        left: calc(100% - ${math(`(${sliderSize.width} / 2) - 1`)});
    }
`;

export const Toggle = ({
    onChange,
    checked,
    name,
    className
}: InputHTMLAttributes<HTMLInputElement>) => (
    <Switch className={className}>
        <HideInput type="checkbox" onChange={onChange} checked={checked} name={name} />
        <Slider />
    </Switch>
);
export default Toggle;
