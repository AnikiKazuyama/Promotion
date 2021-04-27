export enum Units {
    Metric = 'metric',
    Imperial = 'imperial',
    Standart = 'standart'
}

export type Wind = {
    speed: number
    deg: number
    gust: number
}

export type Coord = {
    lon: number
    lat: number
}

export type Sys = {
    type: string
    id: number
    message: string
    country: string
    sunrise: number
    sunset: number
}

export type Rain = {
    '1h': number,
    '3h': number
}

export interface WeatherElement {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Temperature {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

export type Clouds = {
    all: string
}

export interface CommonRequestParams {
    units?: Units
    lang?: string
}

export enum WeatherTypes {
    Rain = 'Rain',
    Drizzle = 'Drizzle',
    Thunderstorm = 'Thunderstorm',
    Snow = 'Snow',
    Mist = 'Mist',
    Smoke = 'Smoke',
    Haze = 'Haze',
    Dust = 'Dust',
    Fog = 'Fog',
    Sand ='Sand',
    Ash = 'Ash',
    Squall = 'Squall',
    Tornado = 'Tornado',
    Clear = 'Clear',
    Clouds = 'Clouds'
}

export enum WeatherIconCodes {
    '11d' = '11d',
    '09d' = '09d',
    '10d' = '10d',
    '13d' = '13d',
    '50d' = '50d',
    '01d' = '01d',
    '01n' = '01n',
    '02d' = '02d',
    '02n' = '02n',
    '03d' = '03d',
    '03n' = '03n',
    '04d' = '04d',
    '04n' = '04n',
}

export type Main = {
    temp: number
    feelsLike: number
    pressure: number
    humidity: number
    tempMin: number
    tempMax: number
    seaLevel: number
    grndLevel: number
}
