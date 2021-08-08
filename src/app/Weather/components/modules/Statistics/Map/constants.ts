import { tileLayer } from 'leaflet';

export const MAP_ID = 'WEATHER_MAP';

export const LAYERS = {
    temperature: {
        title: 'Temperature',
        tileLayer: tileLayer(
            `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`,
            { id: 'Temperature' }
        )
    },
    precipitation: {
        title: 'Precipation',
        tileLayer: tileLayer(
            `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`,
            { id: 'Precipitation' }
        )
    }
};
