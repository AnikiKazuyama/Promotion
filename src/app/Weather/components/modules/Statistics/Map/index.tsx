import { MapContainer, Pane, TileLayer } from 'react-leaflet';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import { useState, memo, useEffect } from 'react';
import { Map as LeafletMapType } from 'leaflet';
import hasOwnPropery from 'app/Weather/utils/object';
import MapLayoutController, { MapLayoutControllerLayerType } from './LayoutController';
import { LAYERS, MAP_ID } from './constants';
import TemperatureTooltip from './Tooltips/Temperature';
import WindTooltip from './Tooltips/Wind';
import useMapStateFromQuery from './QueryManager';
import Marker from './Marker/Marker';

const MapWrapper = styled(MapContainer)`
    height: 100%;
    width: 100%;
`;

export const TooltipContents = {
    Temperature: TemperatureTooltip,
    Wind: WindTooltip,
    Precipation: () => null
};

const Map = ({ initialCenter }) => {
    const [map, setMap] = useState<LeafletMapType>();
    const query = useMapStateFromQuery(map);
    const [currentlayer, setCurrentLayer] = useState<string>('Temperature');

    const onLayerChange = (layer: MapLayoutControllerLayerType) => {
        setCurrentLayer(layer.title);
    };

    const NoopElement = () => null;
    const Tooltip = hasOwnPropery(TooltipContents, currentlayer)
        ? TooltipContents[currentlayer]
        : NoopElement;

    const handleMapClick = (e) => {
        console.log(e);
    };

    useEffect(() => {
        if (map) {
            map.on('click', handleMapClick);
        }

        return map ? () => { map.off('click', handleMapClick); } : () => null;
    }, [map]);

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <MapLayoutController
                map={map}
                layers={LAYERS}
                onChange={onLayerChange}
            />
            <MapWrapper
                id={MAP_ID}
                whenCreated={(containerMap) => setMap(containerMap)}
                center={[query.lat || initialCenter[0], query.lng || initialCenter[1]]}
                zoom={13}
                preferCanvas
            >
                {Tooltip ? <Tooltip /> : null}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker>{currentlayer}</Marker>
            </MapWrapper>
        </div>
    );
};

export default memo(Map);
