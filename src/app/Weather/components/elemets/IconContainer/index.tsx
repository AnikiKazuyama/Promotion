import styled from 'styled-components';

type IconSizes = 'xs' | 's' | 'm' | 'l' | 'xl';

type IconContainerProps = {
    size?: IconSizes;
}

const SIZES = {
    xs: '12px',
    s: '18px',
    m: '24px',
    l: '48px',
    xl: '64px'
};

export const IconContainer = styled.div<IconContainerProps>`
    display: inline-block;
    width: ${({ size }) => {
        if (!size) {
            return SIZES.m;
        }

        return SIZES[size];
    }
}
`;

export default IconContainer;
