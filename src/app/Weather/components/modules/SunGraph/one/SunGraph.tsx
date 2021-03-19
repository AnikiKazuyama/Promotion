import dayjs from 'dayjs';
import { useEffect, useRef, useCallback } from 'react';

const X_SUN_OFFSET = 122.8;
const Y_SUN_OFFSET = 31.8;

const SunGraph = () => {
    const counter = useRef<number>(0);
    const reqFrame = useRef<number>();
    const sunPath = useRef<SVGPathElement>(null);
    const sun = useRef<SVGGElement>(null);

    const time = () => {
        const from = dayjs().hour(6).minute(34);
        const to = dayjs().hour(18).minute(15);
        const currentTime = dayjs();

        const diffFromStartToEnd = to.diff(from, 'minute');
        const differenceFromStartToNow = currentTime.diff(from, 'minute');

        const currentPercent = (differenceFromStartToNow / diffFromStartToEnd);
        return currentPercent;
    };

    const animate = useCallback(() => {
        reqFrame.current = requestAnimationFrame(animate);
        const sunPathLength = sunPath.current?.getTotalLength() || 0;

        if (sun.current !== null && sunPath.current !== null) {
            const pointAtLength = sunPath.current.getPointAtLength(counter.current * sunPathLength);
            const xTransform = pointAtLength.x - X_SUN_OFFSET;
            const yTransform = pointAtLength.y - Y_SUN_OFFSET;

            sun.current.setAttribute('transform', `translate(${xTransform},${yTransform})`);

            if (counter.current < time()) {
                counter.current += 0.013;
            }
        }
    }, [counter, sun, sunPath]);

    useEffect(() => {
        reqFrame.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(reqFrame.current as number);
    }, [animate]);

    return (
        <svg version="1.1" width="100%" height="100%" viewBox="0 0 395 373" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="14" y="32" width="347" height="165">
                <path d="M351 197C351 153.239 333.247 111.271 301.647 80.3274C270.048 49.3839 227.189 32 182.5 32C137.811 32 94.9524 49.3839 63.3525 80.3274C31.7526 111.271 14 153.239 14 197L182.5 197H351Z" fill="#C4C4C4" />
            </mask>
            <g mask="url(#mask0)">
                <rect ref={fillMask} x="-351" y="29" width="351" height="176" fill="#C4C4C4" />
            </g> */}

            <path ref={sunPath} d="M8 197.5C8 174.584 12.5136 151.893 21.283 130.722C30.0525 109.55 42.906 90.3137 59.1099 74.1099C75.3137 57.9061 94.5504 45.0525 115.722 36.283C136.893 27.5136 159.584 23 182.5 23C205.416 23 228.107 27.5136 249.278 36.283C270.45 45.0525 289.686 57.906 305.89 74.1099C322.094 90.3137 334.948 109.55 343.717 130.722C352.486 151.893 357 174.584 357 197.5" stroke="#C4C4C4" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="7.5" cy="197.5" r="7.5" fill="black" />
            <circle cx="357.5" cy="197.5" r="7.5" fill="black" />
            <g id="sungraph__sun" ref={sun} transform="translate(-115,165)">
                <path d="M123 15.71V9.5" stroke="#F4A71D" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" />
                <path d="M123 48.29V54.5" stroke="#F4A71D" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" />
                <path d="M134.52 20.48L138.91 16.09" stroke="#F4A71D" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" />
                <path d="M111.48 43.52L107.09 47.91" stroke="#F4A71D" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" />
                <path d="M111.48 20.48L107.09 16.09" stroke="#F4A71D" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" />
                <path d="M134.52 43.52L138.91 47.91" stroke="#F4A71D" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" />
                <path d="M106.71 32H100.5" stroke="#F4A71D" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" />
                <path d="M139.29 32H145.5" stroke="#F4A71D" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" />
                <path d="M134.8 31.9C134.8 38.4722 129.472 43.8 122.9 43.8C116.328 43.8 111 38.4722 111 31.9C111 25.3278 116.328 20 122.9 20C129.472 20 134.8 25.3278 134.8 31.9Z" fill="#F4A71D" />
            </g>
        </svg>

    );
};

export default SunGraph;
