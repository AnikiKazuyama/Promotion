import StyeldButtonGroup from 'app/components/ui/ButtonGroup';
import ToggleButton from 'app/components/ui/ToggleButton';
import { Layer, layerGroup, Map } from 'leaflet';
import { ChangeEventHandler, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const StyledMapLayoutController = styled(StyeldButtonGroup)`
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1001;
    box-shadow: 0 2px 6px 0 rgb(0 0 0 / 20%);
`;

export type MapLayoutControllerLayerType = {title: string, tileLayer: Layer}
export type MapLayoutControllerLayersType = Record<string, MapLayoutControllerLayerType>

type MapLayoutControllerProps = {
    map: Map | undefined,
    layers: MapLayoutControllerLayersType,
    onChange?: (layer: MapLayoutControllerLayerType) => void
}

const MapLayoutController: React.FC<MapLayoutControllerProps> = ({ map, layers, onChange }) => {
    const tileGroupRef = useRef(layerGroup());
    const { t } = useTranslation();

    useEffect(() => {
        const layerNames = Object.keys(layers);
        const defaultLayer = layers[layerNames[0]].tileLayer;
        const tileGroup = tileGroupRef.current;

        tileGroupRef.current.addLayer(defaultLayer);
        if (map) {
            map.addLayer(tileGroupRef.current);
            if (onChange) { onChange(layers[layerNames[0]]); }
        }

        return () => {
            Object.keys(layers).forEach((layerName) => {
                tileGroup.removeLayer(layers[layerName].tileLayer);
            });
        };
    // eslint-disable-next-line
    }, [map]);

    const handleControllerClick: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (map && e.target) {
            const { value: selectedLayerName } = e.target;
            const selectedLayer = layers[selectedLayerName].tileLayer;
            const tileGroup = tileGroupRef.current;

            Object.keys(layers).forEach((layerName) => {
                tileGroup.removeLayer(layers[layerName].tileLayer);
                tileGroup.addLayer(selectedLayer);
            });

            if (onChange) { onChange(layers[selectedLayerName]); }
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
                        {t(layer.title)}
                    </ToggleButton>
                ))}
            </StyeldButtonGroup>
        </StyledMapLayoutController>
    );
};

export default MapLayoutController;
