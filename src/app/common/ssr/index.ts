import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { AddressInfo } from 'net';
import geoip from 'geoip-lite';
import { findCityByCityName } from 'app/services/WeatherService';
import { getServerSidePropsHandlerWithCityRequired } from 'app/types/ssr';

/**
 *
 * @param redirectToUrl
 * @param redirectToDefault
 * @returns
 */
const getServerSidePropsForIndexPages = (
    redirectToUrl: string,
    redirectToDefault: string
): GetServerSideProps => async ({ req }) => {
    const addressLookup = req.socket.address() as Partial<AddressInfo>;
    const geoLookup = geoip.lookup(addressLookup.address || '');

    if (addressLookup && addressLookup.address && geoLookup) {
        return {
            redirect: {
                destination: `${redirectToUrl}/${geoLookup.city.toLowerCase().replace(' ', '-')}`,
                permanent: true
            }
        };
    }

    return {
        redirect: {
            destination: redirectToDefault,
            permanent: true
        }
    };
};

// eslint-disable-next-line
export const withCityRequired = (func: getServerSidePropsHandlerWithCityRequired) => {
    return async (ssrContext: GetServerSidePropsContext) => {
        const cityQueryParam = ssrContext.query.city as string;
        const city = await findCityByCityName(cityQueryParam);

        if (city) {
            const result = await func(ssrContext, city);
            return result;
        }

        return {
            notFound: true
        };
    };
};

export default getServerSidePropsForIndexPages;
