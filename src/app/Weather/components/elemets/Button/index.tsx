import styled from 'styled-components';

export const BaseButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    background-color: white;
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    min-width: 60px;
    transition: 0.3s background-color;

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
export default BaseButton;
