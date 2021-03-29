import dayjs from 'dayjs';
import { useCallback, useEffect, useRef } from 'react';
import anime from 'animejs';

const X_SUN_OFFSET = -32;
const Y_SUN_OFFSET = -230;

export const SunGraph = () => {
    const sunPath = useRef<SVGPathElement>(null);
    const sun = useRef<SVGGElement>(null);

    const getCurrentTimePercent = useCallback(() => {
        const from = dayjs().hour(6).minute(34);
        const to = dayjs().hour(18).minute(15);
        const currentTime = dayjs();

        const diffFromStartToEnd = to.diff(from, 'minute');
        const differenceFromStartToNow = currentTime.diff(from, 'minute');

        const currentPercent = (differenceFromStartToNow / diffFromStartToEnd);
        return currentPercent * 100;
    }, []);

    const currentTimePercent = getCurrentTimePercent();

    useEffect(() => {
        if (currentTimePercent !== 0 && sunPath.current && sun.current) {
            const path = anime.path(sunPath.current);
            const sunAnimation = anime({
                targets: sun.current,
                translateX: path('x'),
                translateY: path('y'),
                easing: 'linear',
                duration: 1200,
                update(anim) {
                    const currProgress = Math.round(anim.progress);
                    if (currProgress >= currentTimePercent) {
                        sunAnimation.pause();
                    }
                }
            });
        }
    }, [currentTimePercent]);

    return (
        <svg viewBox="0 0 422 292" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path ref={sunPath} d="M33.0874 231C33.0874 207.756 37.6508 184.739 46.5169 163.264C55.383 141.789 68.3781 122.277 84.7602 105.841C101.142 89.4051 120.59 76.3677 141.994 67.4729C163.398 58.5781 186.338 54 209.505 54C232.673 54 255.613 58.5781 277.017 67.4729C298.42 76.3677 317.869 89.4051 334.251 105.841C350.633 122.277 363.628 141.789 372.494 163.264C381.36 184.739 385.923 207.756 385.923 231" stroke="#C4C4C4" strokeWidth="2" strokeDasharray="6 6" />
            <ellipse cx="31.582" cy="230.607" rx="7.58197" ry="7.60684" fill="black" />
            <ellipse cx="386.418" cy="230.607" rx="7.58197" ry="7.60684" fill="black" />
            <g ref={sun}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x={currentTimePercent !== 0 ? X_SUN_OFFSET : -375.418}
                    y={currentTimePercent !== 0 ? Y_SUN_OFFSET : -178}
                >
                    <path d="M31.7459 214.21V208" stroke="#F4A71D" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" />
                    <path d="M31.7459 246.79V253" stroke="#F4A71D" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" />
                    <path d="M43.3918 218.98L47.8298 214.59" stroke="#F4A71D" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" />
                    <path d="M20.1 242.02L15.662 246.41" stroke="#F4A71D" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" />
                    <path d="M20.1 218.98L15.662 214.59" stroke="#F4A71D" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" />
                    <path d="M43.3918 242.02L47.8298 246.41" stroke="#F4A71D" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" />
                    <path d="M15.2779 230.5H9" stroke="#F4A71D" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" />
                    <path d="M48.2139 230.5H54.4918" stroke="#F4A71D" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" />
                    <path d="M43.6749 230.4C43.6749 236.972 38.2888 242.3 31.6448 242.3C25.0008 242.3 19.6148 236.972 19.6148 230.4C19.6148 223.828 25.0008 218.5 31.6448 218.5C38.2888 218.5 43.6749 223.828 43.6749 230.4Z" fill="#F4A71D" />
                </svg>
            </g>
        </svg>
    );
};

export default SunGraph;
