import styled from 'styled-components';

type IconSizes = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl';

type IconContainerProps = {
    size?: IconSizes;
}

const SIZES = {
    xxs: '8px;',
    xs: '16px',
    s: '24px',
    m: '36px',
    l: '48px',
    xl: '64px'
};

export const IconContainer = styled.div<IconContainerProps>`
    display: inline-block;
    vertical-align: middle;
    width: ${({ size }) => {
        if (!size) {
            return SIZES.m;
        }

        return SIZES[size];
    }
}
`;

export default IconContainer;
