import { CurrentWeather, DailyWeatherForecast, MinutelyWeatherForecast } from '../types/weather';

export enum Units {
    Metric = 'metric',
    Imperial = 'imperial',
    Standart = 'standart'
}

export type WeatherApiRequestParams = {
    lat: number,
    lon: number,
    exclude?: Array<string>,
    units?: Units
}

export type HistoricalWeatherApiRequestParams = {
    lan: number,
    lon: number,
    exclude: Array<string>,
    units: Units,
    dt: number
}

export interface WeatherResponse {
    lat: number;
    lon: number;
    timezone: string;
    timezoneOffset: number;
    current?: CurrentWeather;
    minutely?: Array<MinutelyWeatherForecast>;
    hourly?: Array<CurrentWeather>;
    daily?: Array<DailyWeatherForecast>;
}
