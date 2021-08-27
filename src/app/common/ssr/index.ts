import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { AddressInfo } from 'net';
import geoip from 'geoip-lite';
import { findCityByCityName } from 'app/services/WeatherService';
import { getServerSidePropsHandler } from 'app/types/ssr';
import { AnyType } from '../types';

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
export const withCityRequired = (ssrContext: GetServerSidePropsContext) => {
    return async (func: AnyType) => {
        const { query } = ssrContext;
        const cityQueryParam = query.city as string;
        const city = await findCityByCityName(cityQueryParam);
        return func(city, ssrContext);
    };
};

export default getServerSidePropsForIndexPages;
