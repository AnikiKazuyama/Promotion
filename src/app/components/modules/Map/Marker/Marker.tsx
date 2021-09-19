import { renderToString } from 'react-dom/server';
import {
    DivIcon,
    LatLng,
    LatLngTuple,
    LeafletMouseEventHandlerFn,
    Marker,
    PopupEvent
} from 'leaflet';
import {
    Marker as MarkerLeaflet, MarkerProps as MarkerPropsLeaflet, useMap
} from 'react-leaflet';
import { useMount } from 'react-use';
import { isArray } from 'lodash';
import { useEffect, useRef } from 'react';
import MarkerIcon from './Icon';
import useQueryParams from '../hooks';
import MarkerPopup, { MarkerPopupProps } from './Popup';

type ClickMarkerProps = {
    onClick?: (latlng: LatLng) => void
    initialPosition: LatLngTuple
    open?: undefined | boolean
    popupProps?: MarkerPopupProps
    onOpenPopup?: (latlng: LatLng | undefined) => void
    onClosePopup?: (latlng: LatLng | undefined) => void
}
type MarkerProps = Omit<MarkerPropsLeaflet, 'icon' | 'position'> & ClickMarkerProps

const divIcon = new DivIcon({
    html: renderToString(<MarkerIcon />),
    iconSize: [30, 30],
    iconAnchor: [15, 35],
    popupAnchor: [-6, 5],
    className: 'transparent-marker'
});

const ClickMarker: React.FC<MarkerProps> = ({
    children,
    onClick,
    onOpenPopup,
    onClosePopup,
    initialPosition,
    open,
    ...rest
}) => {
    const markerRef = useRef<Marker | null>(null);

    const [query, setQuery] = useQueryParams();
    const defaultPosition = useRef(initialPosition);
    const map = useMap();

    const mlat = isArray(query.mlat) ? query.mlat[0].toString() : query.mlat?.toString();
    const mlng = isArray(query.mlng) ? query.mlng[0].toString() : query.mlng?.toString();

    const position = [
        Number(query.mlat) || defaultPosition.current[0],
        Number(query.mlng) || defaultPosition.current[1]
    ] as LatLngTuple;

    const handleMapClick: LeafletMouseEventHandlerFn = ({ latlng }) => {
        setQuery({
            mlat: latlng.lat.toString(),
            mlng: latlng.lng.toString()
        });
        if (onClick) onClick(latlng);
    };

    const handlePopUpOpen = (e: PopupEvent) => {
        if (onOpenPopup) onOpenPopup(e.popup.getLatLng());
    };

    const handlePopUpClose = (e: PopupEvent) => {
        if (onClosePopup) onClosePopup(e.popup.getLatLng());
    };

    useMount(() => {
        if (mlat !== undefined && mlng !== undefined) {
            setQuery({
                mlat,
                mlng
            });
        }

        markerRef.current?.on('popupopen', handlePopUpOpen);
        markerRef.current?.on('popupclose', handlePopUpClose);
        map.on('click', handleMapClick);

        return () => {
            markerRef.current?.off('popupclose', handlePopUpClose);
            markerRef.current?.off('popupopen', handlePopUpOpen);
            map.off('click', handleMapClick);
        };
    });

    useEffect(() => {
        if (open && markerRef.current) markerRef.current.openPopup();
    }, [open, markerRef]);

    return (
        <MarkerLeaflet
            ref={markerRef}
            position={position}
            icon={divIcon}
            {...rest}
        >
            <MarkerPopup>
                {children}
            </MarkerPopup>
        </MarkerLeaflet>
    );
};

export default ClickMarker;
