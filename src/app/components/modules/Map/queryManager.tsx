import { useLocation } from 'app/context/location';
import { LatLngTuple, LeafletEventHandlerFn, Map } from 'leaflet';
import { useEffect } from 'react';
import useQueryParams from './hooks';

export type MapState = {
    center: LatLngTuple
    zoom: number
}

const useMapStateFromQuery = (map?: Map): MapState => {
    const [query, setQuery] = useQueryParams();
    const { location } = useLocation();

    useEffect(() => {
        const handleMove: LeafletEventHandlerFn = (event) => {
            const targetMap = event.target as Map;
            const currentCenter = targetMap.getCenter();
            const zoom = targetMap.getZoom();

            setQuery({
                lat: currentCenter.lat.toString(),
                lng: currentCenter.lng.toString(),
                z: zoom.toString()
            });
        };

        if (map) {
            map.on('moveend', handleMove);
        }

        return () => {
            if (map) {
                map.off('moveend', handleMove);
            }
        };
    }, [map, setQuery]);

    return {
        center: [
            Number(query.lat) || location.coordinates[0],
            Number(query.lng) || location.coordinates[1]
        ],
        zoom: Number(query.z) || 13
    };
};

export default useMapStateFromQuery;
