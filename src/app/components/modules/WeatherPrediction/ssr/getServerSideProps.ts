import {
    getCurrentWeather,
    getOneCallWeather,
    getWeatherForecast
} from 'app/services/WeatherService';
import { Location } from 'app/context/location/store';
import { withCityRequired } from 'app/common/ssr';
import { CitySuggest } from 'app/services/types/findCityByQuery';
import { GetServerSidePropsContext } from 'next';
import mapDtoToUiData from './dtoMapperToUi';

const getProps = async (context: GetServerSidePropsContext, city: CitySuggest) => {
    const coords = {
        lat: city.coord.lat,
        lon: city.coord.lon
    };
    const result = await Promise.all([
        getCurrentWeather({ ...coords, lang: context.locale }),
        getWeatherForecast({ ...coords, lang: context.locale }),
        getOneCallWeather({
            ...coords,
            exclude: ['current', 'minutely', 'alerts'],
            lang: context.locale
        })]);

    const currentPosition: Location = {
        city: result[0].name,
        coordinates: [result[0].coord.lat, result[0].coord.lon],
        country: result[0].sys.country,
        timezone: result[2].timezone
    };

    return ({
        props: {
            weatherList: mapDtoToUiData(...result),
            initialState: currentPosition
        }
    });
};

const getpropsWithCityRequired = withCityRequired(getProps);

export default getpropsWithCityRequired;
