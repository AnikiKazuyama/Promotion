import { renderToString } from 'react-dom/server';
import { DivIcon, LatLng, LeafletMouseEventHandlerFn } from 'leaflet';
import { Marker as MarkerLeaflet, MarkerProps as MarkerPropsLeaflet, useMap } from 'react-leaflet';
import { useMount } from 'react-use';
import MarkerIcon from './Icon';
import useQueryParams from '../hooks';
import MarkerPopup from './Popup';

type MarkerProps = Omit<MarkerPropsLeaflet, 'icon' | 'position'> & {onClick?: (latlng: LatLng) => void}

type MarkerQueryParams = {
    mlat: string,
    mlng: string
}

const ClickMarker: React.FC<MarkerProps> = ({ children, onClick, ...rest }) => {
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
            mlat: latlng.lat,
            mlng: latlng.lng
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

    const position = isQueryExists ? [query.mlat, query.mlng] : null;

    return position ? (
        <MarkerLeaflet
            position={position}
            icon={divIcon}
            {...rest}
        >
            <MarkerPopup>{children}</MarkerPopup>
        </MarkerLeaflet>
    ) : null;
};

export default ClickMarker;
