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
    const addressLookup = req.socket.address() as Partial<AddressInfo>;
    const geoLookup = geoip.lookup(addressLookup.address || '');

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
