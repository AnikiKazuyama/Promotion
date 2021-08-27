import { findCityByCityName } from 'app/services/WeatherService';
import { getServerSidePropsHandler } from 'app/types/ssr';

const getServerSideProps: getServerSidePropsHandler = async ({
    query
}) => {
    const cityQueryParam = query.city as string;
    const city = await findCityByCityName(cityQueryParam);

    if (city) {
        return ({
            props: {
                initialState: {
                    city: city.name,
                    country: city.sys.country,
                    coordinates: [city.coord.lat, city.coord.lon],
                    timezone: city.timezone
                }
            }
        });
    }

    return {
        notFound: true
    };
};

export default getServerSideProps;
