import { Assign } from 'utility-types';
import { CommonRequestParams, Coord } from './common';

export type CitySuggest = {
    id: number
    name: string
    coord: Coord
    dt: number
    sys: {
        country: string
    }
}

export type CitySuggestWithTimeZone = Assign<CitySuggest, {timezone: string}>

export interface FindCityByQueryResponse {
    cod: number
    count: number
    list: Array<CitySuggest>
}

export interface FindCityByQueryParams extends CommonRequestParams {
    q: string
    coords?: Coord
}

export interface FindCityByCoordsParams extends CommonRequestParams {
    lat: number
    lon: number
}
