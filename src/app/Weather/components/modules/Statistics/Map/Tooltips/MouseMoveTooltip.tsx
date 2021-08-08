import { AnyType } from 'app/common/types';
import { LatLng, LeafletMouseEventHandlerFn, Point } from 'leaflet';
import {
    Children,
    cloneElement,
    isValidElement,
    useEffect,
    useRef,
    useState
} from 'react';
import { useMap } from 'react-leaflet';
import { useMeasure } from 'react-use';
import styled from 'styled-components';
import getMapDomElement from '../utils';

const MouseMoveTooltipWrapper = styled.div`
    display: flex;
    align-items: center;
    min-height: 28px;
    padding: 0 10px;
    text-align: center;
    background: #fff;
    border-radius: 14px;
    color: #393f45;
    white-space: nowrap;
`;

const tooltipOffset = 45;

const MouseMoveTooltip: React.FC = ({ children }) => {
    const map = useMap();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);

    const geoPositionRef = useRef<LatLng>();
    const mouseMoveTooltipRef = useRef<HTMLDivElement | null>();
    const mouseMovePosition = useRef<Point>(new Point(0, 0));

    const [containerRef, { width, height }] = useMeasure<AnyType>();

    useEffect(() => {
        const calculateOverlap = () => {
            const mapDomElement = getMapDomElement();
            const mouseMoveTooltupDomElement = mouseMoveTooltipRef.current;

            if (!mapDomElement || !mouseMoveTooltupDomElement) return;

            const mouseMoveTooltupRect = mouseMoveTooltupDomElement?.getBoundingClientRect();
            const mapRect = mapDomElement.getBoundingClientRect();

            const isOverlapLeft = mouseMoveTooltupRect.left < mapRect.left;
            const isOverlapRight = mouseMoveTooltupRect.right > mapRect.right;

            if (isOverlapLeft) {
                setPosition((previousPosition) => ({
                    ...previousPosition,
                    x: 0
                }));

                return;
            }

            if (isOverlapRight) {
                setPosition((previousPosition) => ({
                    ...previousPosition,
                    x: mapRect.right - width
                }));

                return;
            }
            const xMousePosition = mouseMovePosition.current;

            setPosition((previousPosition) => ({
                ...previousPosition,
                x: xMousePosition.x - (width / 2)
            }));
        };

        const move: LeafletMouseEventHandlerFn = (e) => {
            const mapDomElement = e.originalEvent.target as HTMLDivElement;
            mouseMovePosition.current = e.containerPoint;

            if (!mapDomElement) return;

            const mapDomElementRect = mapDomElement.getBoundingClientRect();

            const isOverlapTop = e.containerPoint.y - (height + tooltipOffset) < 0;
            const isOverlapLeft = e.containerPoint.x - (width / 2) < 0;
            const isOverlapRight = e.containerPoint.x + (width / 2) > mapDomElementRect.width;

            let left = e.containerPoint.x - (width / 2);

            if (isOverlapLeft) {
                left = 0;
            }

            if (isOverlapRight) {
                left = mapDomElementRect.right - width;
            }

            setVisible(!isOverlapTop);
            setPosition({
                x: left,
                y: e.containerPoint.y - tooltipOffset
            });

            geoPositionRef.current = e.latlng;
        };

        const open: LeafletMouseEventHandlerFn = (e) => {
            setVisible(true);
            setPosition({
                x: e.containerPoint.x - (width / 2),
                y: e.containerPoint.y
            });

            geoPositionRef.current = e.latlng;
        };

        const close = () => {
            setVisible(false);
        };

        map.on('mousemove', move);
        map.on('mouseover', open);
        map.on('mouseout', close);

        calculateOverlap();

        return () => {
            map.off('mousemove', move);
            map.off('mouseover', open);
            map.off('mouseout', close);
        };
    }, [containerRef, height, map, width]);

    const newGeoPosition = { position: geoPositionRef.current };

    return (
        <div
            ref={(ref) => {
                mouseMoveTooltipRef.current = ref;
                containerRef(ref);
            }}
            style={{
                position: 'absolute',
                top: position.y,
                left: position.x,
                zIndex: 99999999,
                visibility: visible ? 'visible' : 'hidden'
            }}
        >
            {
                isValidElement(children)
                    ? (
                        <MouseMoveTooltipWrapper>
                            {Children.map(
                                children, (child) => cloneElement(
                                    child, newGeoPosition
                                )
                            )}
                        </MouseMoveTooltipWrapper>
                    )
                    : <MouseMoveTooltipWrapper>{null}</MouseMoveTooltipWrapper>
            }
        </div>
    );
};

export default MouseMoveTooltip;
