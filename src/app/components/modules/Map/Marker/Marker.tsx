import { renderToString } from 'react-dom/server';
import {
    DivIcon,
    LatLng,
    LatLngTuple,
    LeafletMouseEventHandlerFn
} from 'leaflet';
import { Marker as MarkerLeaflet, MarkerProps as MarkerPropsLeaflet, useMap } from 'react-leaflet';
import { useMount } from 'react-use';
import { isArray } from 'lodash';
import { useRef } from 'react';
import MarkerIcon from './Icon';
import useQueryParams from '../hooks';
import MarkerPopup from './Popup';

type MarkerProps = Omit<MarkerPropsLeaflet, 'icon' | 'position'> & {onClick?: (latlng: LatLng) => void, initialPosotion: LatLngTuple}

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
    initialPosotion,
    ...rest
}) => {
    const [query, setQuery] = useQueryParams();
    const defaultPosition = useRef(initialPosotion);
    const map = useMap();

    const mlat = isArray(query.mlat) ? query.mlat[0].toString() : query.mlat?.toString();
    const mlng = isArray(query.mlng) ? query.mlng[0].toString() : query.mlng?.toString();

    const handleMapClick: LeafletMouseEventHandlerFn = ({ latlng }) => {
        setQuery({
            mlat: latlng.lat.toString(),
            mlng: latlng.lng.toString()
        });
        if (onClick) onClick(latlng);
    };

    useMount(() => {
        if (mlat !== undefined && mlng !== undefined) {
            setQuery({
                mlat,
                mlng
            });
        }
        map.on('click', handleMapClick);
    });

    const position = [
        Number(query.mlat) || defaultPosition.current[0],
        Number(query.mlng) || defaultPosition.current[1]
    ] as LatLngTuple;

    return (
        <MarkerLeaflet
            position={position}
            icon={divIcon}
            {...rest}
        >
            <MarkerPopup>{children}</MarkerPopup>
        </MarkerLeaflet>
    );
};

export default ClickMarker;
