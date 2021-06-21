import { Coord } from 'app/Weather/services/types/common';
import {
    findCityByQuery, getCurrentWeather, getOneCallWeather, getWeatherForecast
} from 'app/Weather/services/WeatherService';
import { GetServerSideProps } from 'next';
import { Location } from 'app/Weather/context/location/store';
import mapDtoToUiData from './dtoMapperToUi';

const getProps = async (coords: Coord, lang?: string) => {
    const result = await Promise.all([
        getCurrentWeather({ coords, lang }),
        getWeatherForecast({ coords, lang }),
        getOneCallWeather({
            coords,
            exclude: ['current', 'minutely', 'alerts'],
            lang
        })]);

    const currentPosition: Location = {
        city: result[0].name,
        coordinates: [result[0].coord.lat, result[0].coord.lon],
        country: result[0].sys.country,
        timezone: result[2].timezone
    };

    return ({
        weatherList: mapDtoToUiData(...result),
        initialState: currentPosition
    });
};

const getServerSideProps: GetServerSideProps = async ({
    query,
    locale
}) => {
    const cityQueryParam = query.city as string;
    const listOfCitySuggestions = await findCityByQuery({ q: cityQueryParam.replace(/-/g, ' ') });
    const city = listOfCitySuggestions.list.find((suggestedCity) => suggestedCity.name.toLowerCase().replace(/-/g, ' ') === cityQueryParam.replace(/-/g, ' '));

    if (!city) {
        return {
            notFound: true
        };
    }

    if (city) {
        const props = await getProps({
            lat: city.coord.lat,
            lon: city.coord.lon
        }, locale);
        return ({ props });
    }

    return {
        notFound: true
    };
};

export default getServerSideProps;
