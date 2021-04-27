import { WeatherElement } from 'app/Weather/services/types/common';

export type ShortDayStatistic = {
    weatherCode: string
    timePeriod: string
    temperature: number
    humidity?: number
}

export type Wind = {
    direction: number
    power: number
}

export type HourForecastItem = {
    temp: number
    dt: number
    humidity: number
    wind: Wind
    pressure: number
    weather: Array<WeatherElement>
}

export type WeatherCardProps = {
    dt: number
    currentDayPeriods: Array<ShortDayStatistic>
    currentTemperature: number
    feelsLike: number
    humidity: number
    maxTemperature: number
    minTemperature: number
    preassure: number
    sunrise: number
    sunset: number
    weather: string
    weatherCode: string
    wind: Wind
    hourlyDayPeriods: Array<HourForecastItem>
}
