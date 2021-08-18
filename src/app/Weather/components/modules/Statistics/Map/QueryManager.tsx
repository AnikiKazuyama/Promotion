import { LeafletEventHandlerFn, Map } from 'leaflet';
import { useEffect } from 'react';
import useQueryParams from './hooks';

const useMapStateFromQuery = (map) => {
    const [query, setQuery] = useQueryParams();

    useEffect(() => {
        const handleMove: LeafletEventHandlerFn = (event) => {
            const targetMap = event.target as Map;
            const currentCenter = targetMap.getCenter();

            setQuery({
                lat: currentCenter.lat,
                lng: currentCenter.lng
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

    return query;
};

export default useMapStateFromQuery;
