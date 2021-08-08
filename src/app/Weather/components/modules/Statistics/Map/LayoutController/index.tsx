import StyeldButtonGroup from 'app/Weather/components/elemets/ButtonGroup';
import ToggleButton from 'app/Weather/components/elemets/ToggleButton';
import { Layer, layerGroup, Map } from 'leaflet';
import { ChangeEventHandler, useEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledMapLayoutController = styled(StyeldButtonGroup)`
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1001;
    box-shadow: 0 2px 6px 0 rgb(0 0 0 / 20%);
`;

type MapLayoutControllerLayersType = Record<string, {title: string, tileLayer: Layer}>

type MapLayoutControllerProps = {
    map: Map | undefined,
    layers: MapLayoutControllerLayersType,
    onChange?: () => void
}

const MapLayoutController: React.FC<MapLayoutControllerProps> = ({ map, layers, onChange }) => {
    const tileGroupRef = useRef(layerGroup());

    useEffect(() => {
        const layerNames = Object.keys(layers);
        const defaultLayer = layers[layerNames[0]].tileLayer;
        const tileGroup = tileGroupRef.current;

        tileGroupRef.current.addLayer(defaultLayer);
        if (map) {
            map.addLayer(tileGroupRef.current);
        }

        return () => {
            Object.keys(layers).forEach((layerName) => {
                tileGroup.removeLayer(layers[layerName].tileLayer);
            });
        };
    }, [layers, map]);

    const handleControllerClick: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (map && e.target) {
            const { value: selectedLayerName } = e.target;
            const selectedLayer = layers[selectedLayerName].tileLayer;
            const tileGroup = tileGroupRef.current;

            Object.keys(layers).forEach((layerName) => {
                tileGroup.removeLayer(layers[layerName].tileLayer);
                tileGroup.addLayer(selectedLayer);
            });

            if (onChange) { onChange(); }
        }
    };

    return (
        <StyledMapLayoutController>
            <StyeldButtonGroup>
                {Object.entries(layers).map(([value, layer], index) => (
                    <ToggleButton
                        name="layer-type"
                        value={value}
                        onChange={handleControllerClick}
                        defaultChecked={index === 0}
                        key={layer.title}
                    >
                        {layer.title}
                    </ToggleButton>
                ))}
            </StyeldButtonGroup>
        </StyledMapLayoutController>
    );
};

export default MapLayoutController;
