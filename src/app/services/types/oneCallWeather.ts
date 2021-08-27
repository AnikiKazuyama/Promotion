import { Assign } from 'utility-types';
import {
    CommonRequestParams,
    Rain,
    WeatherElement
} from './common';

export interface CurrentWeather {
    dt: number;
    sunrise?: number;
    sunset?: number;
    temp: number;
    feelsLike: number;
    pressure: number;
    humidity: number;
    dewPoint: number;
    uvi: number;
    clouds: number;
    visibility: number;
    windSpeed: number;
    windDeg: number;
    weather: WeatherElement[];
    windGust?: number;
    pop?: number;
    rain?: Rain;
}

export interface FeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
}

export interface Temperature {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

export interface DailyWeatherForecast {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: Temperature;
    feelsLike: FeelsLike;
    pressure: number;
    humidity: number;
    dewPoint: number;
    windSpeed: number;
    windDeg: number;
    weather: WeatherElement[];
    clouds: number;
    pop: number;
    rain?: number;
    uvi: number;
}

export interface MinutelyWeatherForecast {
    dt: number;
    precipitation: number;
}

type FullSearchParams = {
    exclude?: Array<string>
    lat: number
    lon: number
}

export type SearchParams = FullSearchParams

export type OneCallRequestParams = Assign<CommonRequestParams, SearchParams>
export interface HistoryCallRequestParams extends OneCallRequestParams {
    dt: number
}

export interface OneCallWeatherResponse {
    lat: number;
    lon: number;
    timezone: string;
    timezoneOffset: number;
    current?: CurrentWeather;
    minutely?: Array<MinutelyWeatherForecast>;
    hourly?: Array<CurrentWeather>;
    daily?: Array<DailyWeatherForecast>;
}
