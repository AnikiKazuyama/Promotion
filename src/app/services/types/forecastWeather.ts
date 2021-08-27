import { AtLeastOne } from 'app/types/typeUtils';
import { Assign } from 'utility-types';
import {
    Clouds, CommonRequestParams, Coord, Main, Rain, WeatherElement, Wind
} from './common';

type FullSearchParams = {
    id: number
    cnt: number
    lat: number
    lon: number
    zip: number
}

export type SearchParams = AtLeastOne<FullSearchParams>

export type ForecastWeatherRequestParams = Assign<CommonRequestParams, SearchParams>

export interface ForecastWeatherResponse {
    cod: number
    message: string
    cnt: number
    list: Array<{
        main: Main
        weather: Array<WeatherElement>
        clouds: Clouds
        wind: Wind
        visibility: number
        pop: number
        rain: Pick<Rain, '3h'>
        snow: Pick<Rain, '3h'>
        dtTxt: number
    }>
    city: {
        id: number
        name: string
        coord: Coord
        country: string
        timezone: string
    }
}
