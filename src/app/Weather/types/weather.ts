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

export interface WeatherElement {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Rain {
    '1h': number;
}

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
