import { random } from 'lodash';
import styled, { keyframes } from 'styled-components';
import { Cloudy } from '../WeatherTag/icons';

const CloudyLoaderContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
`;

const linearMove = keyframes`
    from {
        left: -90px;
    }

    to {
        left: calc(100% + 20px);
    }
`;

type LoaderAnimationConfig = {
    time: number
    easyng: string
    top: number
    scale: number
}

type LoaderAnimationList = Array<LoaderAnimationConfig>

const AnimateItemContainer = styled.div.attrs<LoaderAnimationConfig>(({
    top, time, easyng, scale
}) => ({
    style: {
        top: `${top}px`,
        animationDuration: `${time}s`,
        animationTimingFunction: easyng,
        animationIterationCount: 'infinite',
        animationDelay: `${-random(12, 24, false)}s`,
        transform: `scale(${scale})`
    }
}))`
    position: absolute;
    animation-name: ${linearMove};
    left: -90px;
    width: 90px;
    height: 90px;
    z-index: 100;
`;

const CloudyLoader = () => {
    const animationList: LoaderAnimationList = Array.from(Array(10)).map(() => ({
        time: random(12, 24, false),
        easyng: 'ease-in',
        top: random(0, 600, false),
        scale: random(1, 2)
    }));

    return (
        <CloudyLoaderContainer>
            {animationList.map((animationConfig) => (
                <AnimateItemContainer
                    key={Math.random()}
                    {...animationConfig}
                >
                    <Cloudy />
                </AnimateItemContainer>
            ))}
        </CloudyLoaderContainer>
    );
};

export default CloudyLoader;
