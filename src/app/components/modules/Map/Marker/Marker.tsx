import { renderToString } from 'react-dom/server';
import {
    DivIcon,
    LatLng,
    LatLngExpression,
    LeafletMouseEventHandlerFn
} from 'leaflet';
import { Marker as MarkerLeaflet, MarkerProps as MarkerPropsLeaflet, useMap } from 'react-leaflet';
import { useMount } from 'react-use';
import MarkerIcon from './Icon';
import useQueryParams from '../hooks';
import MarkerPopup from './Popup';

type MarkerProps = Omit<MarkerPropsLeaflet, 'icon' | 'position'> & {onClick?: (latlng: LatLng) => void, initialPosotion: LatLngExpression}

type MarkerQueryParams = {
    mlat: string,
    mlng: string
}

const ClickMarker: React.FC<MarkerProps> = ({
    children, onClick, initialPosotion, ...rest
}) => {
    const [query, setQuery] = useQueryParams();

    const divIcon = new DivIcon({
        html: renderToString(<MarkerIcon />),
        iconSize: [30, 30],
        iconAnchor: [15, 35],
        popupAnchor: [-6, 5]
    });

    const map = useMap();

    const handleMapClick: LeafletMouseEventHandlerFn = ({ latlng }) => {
        setQuery({
            mlat: latlng.lat.toString(),
            mlng: latlng.lng.toString()
        });
        if (onClick) onClick(latlng);
    };

    const isQueryExists = query.mlat && query.mlng;

    useMount(() => {
        if (isQueryExists) {
            setQuery({
                mlat: query.mlat,
                mlng: query.mlng
            });
        }
        map.on('click', handleMapClick);
    });

    const position = isQueryExists ? [query.mlat as number, query.mlng as number] : initialPosotion;

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
