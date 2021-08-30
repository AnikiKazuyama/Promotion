import { withCityRequired } from 'app/common/ssr';
import { CitySuggestWithTimeZone } from 'app/services/types/findCityByQuery';
import { GetServerSidePropsContext } from 'next';

const getServerSideProps = async (_: GetServerSidePropsContext, city: CitySuggestWithTimeZone) => ({
    props: {
        initialState: {
            city: city.name,
            country: city.sys.country,
            coordinates: [city.coord.lat, city.coord.lon] as [number, number],
            timezone: city.timezone
        }
    }
});

export default withCityRequired(getServerSideProps);
