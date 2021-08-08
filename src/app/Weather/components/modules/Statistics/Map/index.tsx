import { MapContainer, TileLayer } from 'react-leaflet';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { Map as LeafletMapType } from 'leaflet';
import MapLayoutController from './LayoutController';
import TemperatureTooltip from './Tooltips/Temperature';
import { LAYERS, MAP_ID } from './constants';
import MouseMoveTooltip from './Tooltips/MouseMoveTooltip';

const MapWrapper = styled(MapContainer)`
    height: 100%;
    width: 100%;
    cursor: pointer;
`;

const PrecipationTooltipContent = () => <span>Precipation</span>;

const TooltipContents = {
    Temperature: TemperatureTooltip,
    Precipation: PrecipationTooltipContent
};

const Map = () => {
    const [map, setMap] = useState<LeafletMapType>();

    return (

        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <MapLayoutController
                map={map}
                layers={LAYERS}
            />
            <MapWrapper
                id={MAP_ID}
                whenCreated={(containerMap) => setMap(containerMap)}
                center={[51.505, -0.09]}
                zoom={13}
            >
                <MouseMoveTooltip><TooltipContents.Temperature /></MouseMoveTooltip>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapWrapper>
        </div>
    );
};

export default Map;
