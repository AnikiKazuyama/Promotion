import {
    MutableRefObject,
    useEffect,
    useRef,
    useState
} from 'react';

type Size = {
    width: number,
    height: number,
    offsetWidth: number,
    offsetHeight: number
}

type UseSizeResult<E extends HTMLElement> = [MutableRefObject<E | null>, Size]

const DEFAULT_SIZE: Size = {
    width: 0,
    height: 0,
    offsetWidth: 0,
    offsetHeight: 0
};

/**
 *
 * @returns
 */
function useSize<E extends HTMLElement>(): UseSizeResult<E> {
    const elementRef = useRef<E | null>(null);
    const [size, setSize] = useState<Size>(DEFAULT_SIZE);

    useEffect(() => {
        const element = elementRef.current;
        if (element) {
            // Maybe better to use ResizeObserver
            const boundingRect = element.getBoundingClientRect();
            setSize({
                width: boundingRect.width,
                height: boundingRect.height,
                offsetHeight: element.offsetHeight,
                offsetWidth: element.offsetWidth
            });
        }
    }, [elementRef]);

    return [elementRef, size];
}

export default useSize;
