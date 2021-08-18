import { AtLeastOne } from 'app/Weather/types/typeUtils';
import { Assign } from 'utility-types';
import {
    Coord,
    Clouds,
    Rain,
    Sys,
    Wind,
    CommonRequestParams,
    WeatherElement,
    Main
} from './common';

type FullSearchParams = {
    lat: number
    lon: number
    zip: number
}

export type SearchParams = AtLeastOne<FullSearchParams>

export type CurrentWeatherRequestParams = Assign<CommonRequestParams, SearchParams>

export interface CurrentWeatherResponse {
    coord: Coord
    weather: Array<WeatherElement>
    base: string
    main: Main
    wind: Wind
    clouds: Clouds
    rain: Rain
    dt: number
    sys: Sys
    timezone: string
    id: number
    name: string
    cod: number
}
