import { MapContainer, TileLayer } from 'react-leaflet';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import { useState, memo, useEffect } from 'react';
import { LeafletMouseEventHandlerFn, Map as LeafletMapType } from 'leaflet';
import hasOwnPropery from 'app/utils/object';
import MapLayoutController, { MapLayoutControllerLayerType } from './LayoutController';
import { LAYERS, MAP_ID } from './constants';
import TemperatureTooltip from './Tooltips/Temperature';
import WindTooltip from './Tooltips/Wind';
import useMapStateFromQuery from './QueryManager';
import Marker from './Marker/Marker';

const Container = styled.div`
    display: flex;
    height: 100%;
`;

const MapWrapper = styled(MapContainer)`
    height: 100%;
    width: 100%;
`;

const Aside = styled.div`
    padding: 8px;
    min-width: 250px;
`;

export const TooltipContents = {
    Temperature: TemperatureTooltip,
    Wind: WindTooltip,
    Precipation: () => null
};

const Map = () => {
    const [map, setMap] = useState<LeafletMapType>();
    const [currentlayer, setCurrentLayer] = useState<string>('Temperature');
    const query = useMapStateFromQuery(map);

    const onLayerChange = (layer: MapLayoutControllerLayerType) => {
        setCurrentLayer(layer.title);
    };

    const NoopElement = () => null;
    const Tooltip = hasOwnPropery(TooltipContents, currentlayer)
        ? TooltipContents[currentlayer]
        : NoopElement;

    const handleMapClick: LeafletMouseEventHandlerFn = (e) => {
        console.log(e.originalEvent);
    };

    useEffect(() => {
        if (map) {
            map.on('contextmenu', handleMapClick);
        }

        return map ? () => { map.off('click', handleMapClick); } : () => null;
    }, [map]);

    return (
        <Container>
            <Aside />
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <MapLayoutController
                    map={map}
                    layers={LAYERS}
                    onChange={onLayerChange}
                />
                <MapWrapper
                    id={MAP_ID}
                    whenCreated={(containerMap) => setMap(containerMap)}
                    center={query.center}
                    zoom={query.zoom}
                    preferCanvas
                >
                    {Tooltip ? <Tooltip /> : null}
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker initialPosotion={query.center}>{currentlayer}</Marker>
                </MapWrapper>
            </div>
        </Container>
    );
};

export default memo(Map);
