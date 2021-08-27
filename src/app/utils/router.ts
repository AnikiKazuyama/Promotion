import { NextRouter } from 'next/router';

type RedirectToCityConf = {
    lat: number
    lon: number
    name: string
}

const redirectToCity = (router: NextRouter, {
    lat,
    lon,
    name
}: RedirectToCityConf) => {
    router.push({
        href: router.pathname,
        query: {
            lat,
            lon,
            cityName: name
        }
    }, name.toLowerCase().replace(/ /g, '-'));
};

export default redirectToCity;
