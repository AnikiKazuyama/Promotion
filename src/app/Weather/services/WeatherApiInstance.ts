import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { Units } from './types/common';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const weatherApiInstance = axios.create({
    baseURL: BASE_URL,
    params: {
        appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
        units: Units.Metric
    }
});

weatherApiInstance.interceptors.response.use((response) => ({
    ...response,
    data: camelcaseKeys(response.data, { deep: true })
}), async (error) => Promise.reject(error));

export default weatherApiInstance;
