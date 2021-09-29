import { MapContainer, TileLayer } from 'react-leaflet';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import { useState, memo, useEffect } from 'react';
import { LeafletMouseEventHandlerFn, Map as LeafletMapType } from 'leaflet';
import MapLayoutController, { MapLayoutControllerLayerType } from './LayoutController';
import { LAYERS, MAP_ID } from './constants';
import useMapStateFromQuery from './queryManager';
import TemperaturePopup from './Marker/Temperature';
import TooltipByLayer from './Tooltips/ByLayer';

const Container = styled.div`
    display: flex;
    height: 100%;
`;

const MapWrapper = styled(MapContainer)`
    height: 100%;
    width: 100%;
`;

const Map = () => {
    const [map, setMap] = useState<LeafletMapType>();
    const [currentlayer, setCurrentLayer] = useState<string>('Temperature');
    const query = useMapStateFromQuery(map);

    const onLayerChange = (layer: MapLayoutControllerLayerType) => {
        setCurrentLayer(layer.title);
    };

    const handleMapClick: LeafletMouseEventHandlerFn = () => null;

    useEffect(() => {
        if (map) {
            map.on('contextmenu', handleMapClick);
        }

        return map ? () => { map.off('click', handleMapClick); } : () => null;
    }, [map]);

    return (
        <Container>
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
                    minZoom={3}
                    zoomControl={false}
                    preferCanvas
                    worldCopyJump
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <TemperaturePopup />
                    <TooltipByLayer currentlayer={currentlayer} />
                </MapWrapper>
            </div>
        </Container>
    );
};

export default memo(Map);
