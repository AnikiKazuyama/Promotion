import { GetServerSideProps } from 'next';

import geoip from 'geoip-lite';
import { AddressInfo } from 'node:net';
import getCurrentWeather from 'app/Weather/services/CurrentWeatherService';
import BaseLayout from 'app/Weather/components/layouts/Base';
import DetailsDaysList from 'app/Weather/components/modules/Statistics/TenDays/InDetails';
import { DailyWeatherForecast } from 'app/Weather/types/weather';

type CurrentPosition = {
    city: string,
    coordinates: [number, number]
    country: string,
    timezone: string
}

const DefaultCity: CurrentPosition = {
    country: 'US',
    timezone: 'America/Chicago',
    city: 'San Antonio',
    coordinates: [29.4963, -98.4004]
};

type WeatherPageProps = {
    currentPosition: CurrentPosition,
    weatherList: Array<DailyWeatherForecast>
}

/**
 * Render full day statistics
 */
export default function FullDayStatistics({
    currentPosition,
    weatherList
}: WeatherPageProps): JSX.Element {
    return (
        <BaseLayout>
            <DetailsDaysList weatherList={weatherList} />
        </BaseLayout>
    );
}

/**
 * Get client geolocation and passing it to component
 */
export const getServerSideProps: GetServerSideProps<WeatherPageProps> = async ({ req }) => {
    const addressLookup = req.socket.address() as Partial<AddressInfo>;
    const geoLookup = geoip.lookup(addressLookup.address);

    if (addressLookup && addressLookup.address && geoLookup) {
        const currentPosition: CurrentPosition = {
            city: geoLookup.city,
            coordinates: geoLookup.ll,
            country: geoLookup.country,
            timezone: geoLookup.timezone
        };

        const weatherData = await getCurrentWeather({ lat: geoLookup.ll[0], lon: geoLookup.ll[1] });

        return {
            props: {
                weatherList: weatherData.daily,
                currentPosition: currentPosition || DefaultCity
            }
        };
    }

    const weatherDataDefault = await getCurrentWeather({
        lat: DefaultCity.coordinates[0],
        lon: DefaultCity.coordinates[1]
    });

    return {
        props: {
            currentPosition: DefaultCity,
            weatherList: weatherDataDefault.daily
        }
    };
};
