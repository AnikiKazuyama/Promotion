import styled, { keyframes } from 'styled-components';

const pulseAnimation = keyframes`
0% {
    transform: translate(-50%, -50%) scale(0);
    background-color: var(--color-blue-light);
    opacity: 0;
}

50% {
    opacity: 1.0;
}

100% {
    transform: translate(-50%, -50%) scale(1.2);
    background-color: var(--color-blue-light);
    opacity: 0;
}
`;

const Pulse = styled.div`
    position: relative;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: var(--color-blue-contrast);

    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 12px;
        height: 12px;
        border-radius: 50%;
        animation: ${pulseAnimation} 0.9s linear infinite;
    }
`;

export default Pulse;
