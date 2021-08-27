import dayjs from 'dayjs';
import { CurrentWeatherResponse } from 'app/services/types/currentWeather';
import { ForecastWeatherResponse } from 'app/services/types/forecastWeather';
import { OneCallWeatherResponse } from 'app/services/types/oneCallWeather';
import { WeatherCardProps } from '../types';

const mapDtoToUiData = (
    currentWeatherData: CurrentWeatherResponse,
    forecastWeatherData: ForecastWeatherResponse,
    dailyOneCallData: OneCallWeatherResponse
): Array<WeatherCardProps> => {
    if (!dailyOneCallData.daily) return [];

    return dailyOneCallData.daily.slice(0, 5).map(({
        dt,
        sunrise,
        sunset,
        temp,
        humidity,
        pressure,
        weather,
        feelsLike,
        windDeg,
        windSpeed
    }, index) => ({
        dt,
        humidity: index === 0 ? currentWeatherData.main.humidity : humidity,
        preassure: index === 0 ? currentWeatherData.main.pressure : pressure,
        sunset,
        sunrise,
        minTemperature: index === 0 ? currentWeatherData.main.tempMin : temp.min,
        maxTemperature: index === 0 ? currentWeatherData.main.tempMax : temp.max,
        weather: index === 0 ? currentWeatherData.weather[0].description : weather[0].description,
        weatherCode: index === 0 ? currentWeatherData.weather[0].icon : weather[0].icon,
        feelsLike: index === 0 ? currentWeatherData.main.feelsLike : feelsLike.day,
        currentTemperature: index === 0 ? currentWeatherData.main.temp : temp.day,
        wind: {
            power: index === 0 ? currentWeatherData.wind.speed : windSpeed,
            direction: index === 0 ? currentWeatherData.wind.deg : windDeg
        },
        currentDayPeriods: forecastWeatherData.list
            .slice(index * 8, index * 8 + 8)
            .filter((forecastWeather) => dayjs(forecastWeather.dtTxt).hour() % 6 === 0)
            .map((currentWeather) => ({
                weatherCode: currentWeather.weather[0].icon,
                timePeriod: dayjs(currentWeather.dtTxt).format('HH:mm'),
                temperature: currentWeather.main.temp,
                humidity: currentWeather.main.humidity
            })),
        hourlyDayPeriods: forecastWeatherData.list
            .slice(index * 8, index * 8 + 8)
            .map((forecatHourly) => ({
                dt: dayjs(forecatHourly.dtTxt).unix(),
                temp: forecatHourly.main.temp,
                humidity: forecatHourly.main.humidity,
                pressure: forecatHourly.main.pressure,
                wind: {
                    direction: forecatHourly.wind.deg,
                    power: forecatHourly.wind.speed
                },
                weather: forecatHourly.weather
            }))
    }));
};

export default mapDtoToUiData;
