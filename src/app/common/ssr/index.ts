import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { AddressInfo } from 'net';
import geoip from 'geoip-lite';
import { findCityByCityCoords, findCityByCityName } from 'app/services/WeatherService';
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
): GetServerSideProps => async ({ req, query }) => {
    const forwarderFor = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const ip = Array.isArray(forwarderFor) ? forwarderFor[0] : forwarderFor?.split(',')[0].trim();

    const geoLookup = geoip.lookup(ip);

    if (geoLookup) {
        return {
            redirect: {
                destination: `/${geoLookup.city.toLowerCase().replace(' ', '-')}`,
                permanent: true
            }
        };
    }

    if (query.mlat && query.mlng) {
        const city = await findCityByCityCoords({
            lat: Number(query.mlat),
            lon: Number(query.mlng)
        });

        if (city) {
            return {
                redirect: {
                    destination: `${redirectToUrl}/${city.name.toLowerCase().replace(' ', '-')}`,
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
        try {
            let city = null;

            const cityQueryParam = ssrContext.query.city as string;

            if (cityQueryParam) {
                city = await findCityByCityName(cityQueryParam);
            } else {
                const { mlat, mlng } = ssrContext.query;
                city = await findCityByCityCoords({ lat: Number(mlat), lon: Number(mlng) });
            }

            if (city) {
                const result = await func(ssrContext, city);
                return result;
            }

            return {
                notFound: true
            };
        } catch (e) {
            return {
                notFound: true
            };
        }
    };
};

export default getServerSidePropsForIndexPages;
