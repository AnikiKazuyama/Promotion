import { CurrentWeatherRequestParams, CurrentWeatherResponse } from './types/currentWeather';
import { FindCityByQueryParams, FindCityByQueryResponse, FindCityByCoordsParams } from './types/findCityByQuery';
import { ForecastWeatherResponse, ForecastWeatherRequestParams } from './types/forecastWeather';
import { OneCallWeatherResponse, OneCallRequestParams, HistoryCallRequestParams } from './types/oneCallWeather';
import weatherApiInstance from './WeatherApiInstance';

const requester = async <ReqResponse, ReqParams>(
    url: string,
    params: ReqParams
) => {
    const response = await weatherApiInstance.get<ReqResponse>(url, { params });
    return response.data;
};

export const getOneCallWeather = (params: OneCallRequestParams) => requester<OneCallWeatherResponse, OneCallRequestParams>('/onecall', params);

export const getPreviousWeather = (params: HistoryCallRequestParams) => requester<OneCallWeatherResponse, OneCallRequestParams>('/onecall/timemachine', params);

export const getCurrentWeather = (params: CurrentWeatherRequestParams) => requester<CurrentWeatherResponse, CurrentWeatherRequestParams>('/weather', params);

export const getWeatherForecast = async (params: ForecastWeatherRequestParams) => requester<ForecastWeatherResponse, ForecastWeatherRequestParams>('/forecast', params);

export const findCityByQuery = async ({ q }: FindCityByQueryParams) => requester<FindCityByQueryResponse, FindCityByQueryParams>('/find', { q });

export const findCityByCoords = async ({ lat, lon }: FindCityByCoordsParams) => requester<FindCityByQueryResponse, FindCityByCoordsParams>('/find', { lat, lon });
