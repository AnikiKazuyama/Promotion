import {
    MapContainer, TileLayer, useMapEvent, Marker, Tooltip
} from 'react-leaflet';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import {
    ChangeEventHandler,
    useRef,
    useState,
    Children,
    cloneElement,
    useEffect,
    isValidElement,
    useCallback
} from 'react';
import {
    DivIcon,
    LeafletMouseEvent,
    tileLayer,
    layerGroup,
    Layer,
    Map as LeafletMapType,
    LatLng
} from 'leaflet';
import StyeldButtonGroup from 'app/Weather/components/elemets/ButtonGroup';
import ToggleButton from 'app/Weather/components/elemets/ToggleButton';
import { getCurrentWeather } from 'app/Weather/services/WeatherService';
import { debounce, random } from 'lodash';

const MapWrapper = styled(MapContainer)`
    height: 100%;
    width: 100%;
`;

const MouseMoveTooltip: React.FC = ({ children }) => {
    const [position, setPosition] = useState<LatLng>(new LatLng(0, 0));
    const [isMouseOut, setMouseOut] = useState<boolean>(true);

    const handleMauseMove = (e: LeafletMouseEvent) => {
        setPosition(e.latlng);
        // setMouseOut(false);
    };

    const handleMouseOut = () => {
        console.log('handle out');
        // setMouseOut(true);
    };

    useMapEvent('mouseover', handleMauseMove);
    useMapEvent('mousemove', handleMauseMove);
    useMapEvent('mouseout', handleMouseOut);

    const Icon = new DivIcon({
        className: 'transparent-marker'
    });

    return (
        <Marker
            icon={Icon}
            position={position}
        >
            <Tooltip
                position={position}
                direction="bottom"
                permanent
            >
                {Children.map(
                    children,
                    (child) => (isValidElement(child) ? cloneElement(child, { position }) : null)
                )}
            </Tooltip>
        </Marker>
    );
};

const StyledMapLayoutController = styled(StyeldButtonGroup)`
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1001;
    box-shadow: 0 2px 6px 0 rgb(0 0 0 / 20%);
`;

const tileGroup = layerGroup();

type MapLayoutControllerLayersType = Record<string, {title: string, tileLayer: Layer}>

type MapLayoutControllerProps = {
    map: LeafletMapType | undefined,
    layers: MapLayoutControllerLayersType,
    onChange?: () => void
}

const MapLayoutController: React.FC<MapLayoutControllerProps> = ({ map, layers, onChange }) => {
    const checkedLayers = useRef({});

    useEffect(() => {
        if (map) {
            map.addLayer(tileGroup);
        }
    }, [map]);

    const handleControllerClick: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (map && e.target) {
            const { name, checked } = e.target;
            checkedLayers.current = { ...checkedLayers.current, [name]: checked };
            Object.entries(checkedLayers.current).forEach(([layerName, isLayerActive]) => {
                if (isLayerActive) {
                    tileGroup.addLayer(layers[layerName].tileLayer);
                } else {
                    tileGroup.removeLayer(layers[layerName].tileLayer);
                }
            });
            if (onChange) { onChange(); }
        }
    };

    return (
        <StyledMapLayoutController>
            <StyeldButtonGroup>
                {Object.entries(layers).map(([name, layer]) => (
                    <ToggleButton
                        name={name}
                        onChange={handleControllerClick}
                    >
                        {layer.title}
                    </ToggleButton>
                ))}
            </StyeldButtonGroup>
        </StyledMapLayoutController>
    );
};

const layers = {
    temperature: { title: 'Temperature', tileLayer: tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`, { id: 'Temperature' }) },
    precipitation: { title: 'Precipation', tileLayer: tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`, { id: 'Precipitation' }) }
};

const fetchWeatherDebounced = debounce(async (position: LatLng) => {
    const weather = await getCurrentWeather({ coords: { lat: position.lat, lon: position.lng } });
    return weather.main.temp;
}, 250);

const TemperatureTooltipContent: React.FC<{position: LatLng}> = ({ position }) => {
    const [temp, setTemp] = useState<number>();
    const fetchDebounced = useCallback(
        debounce(() => {
            console.log(position);
            setTemp(random());
        }, 200),
        []
    );
    useEffect(() => {
        fetchDebounced(); console.log(position);
    }, [fetchDebounced, position]);

    return (
        <div>
            Temperature:
            {' '}
            {temp}
        </div>
    );
};
const PrecipationTooltipContent = () => <span>Precipation</span>;

const TooltipContents = {
    Temperature: TemperatureTooltipContent,
    Precipation: PrecipationTooltipContent
};

const Map = () => {
    const [map, setMap] = useState<LeafletMapType>();
    const [activeTooltips, setActiveTooltips] = useState([]);

    const handleTileLayerChange = () => {
        const activeLayers = tileGroup.getLayers();
        setActiveTooltips(activeLayers.map((layer) => layer.id));
    };

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <MapLayoutController
                map={map}
                onChange={handleTileLayerChange}
                layers={layers}
            />
            <MapWrapper
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
