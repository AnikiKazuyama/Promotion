import { Coord } from 'app/services/types/common';
import {
    getCurrentWeather,
    getOneCallWeather,
    getWeatherForecast,
    findCityByCityName
} from 'app/services/WeatherService';
import { Location } from 'app/context/location/store';
import { getServerSidePropsHandler } from 'app/types/ssr';
import { AnyType } from 'app/common/types';
import { withCityRequired } from 'app/common/ssr';
import mapDtoToUiData from './dtoMapperToUi';
import { WeatherListProps } from '../types';

const getProps = async (city, context) => {
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

// const getServerSideProps: getServerSidePropsHandler<WeatherListProps> = async ({
//     query,
//     locale
// }) => {
//     const cityQueryParam = query.city as string;
//     const city = await findCityByCityName(cityQueryParam);

//     if (city) {
//         const props = await getProps({
//             lat: city.coord.lat,
//             lon: city.coord.lon
//         }, locale);
//         return ({ props });
//     }

//     return {
//         notFound: true
//     };
// };

const getServerSideProps = (context: AnyType) => withCityRequired(context)(getProps);

export default getServerSideProps;
