export type ShortDayStatistic = {
    weatherCode: string
    timePeriod: string
    temperature: number
    humidity?: string
}

export type Wind = {
    direction: number
    power: number
}
