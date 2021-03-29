import { Units, WeatherApiRequestParams, WeatherResponse } from './types';
import weatherApiInstance from './WeatherApiInstance';

const getCurrentWeather = async ({
    units = Units.Metric,
    ...rest
}: WeatherApiRequestParams) => {
    const response = await weatherApiInstance.get<WeatherResponse>('/onecall', {
        params: {
            units,
            ...rest
        }
    });

    return response.data;
};

export default getCurrentWeather;
