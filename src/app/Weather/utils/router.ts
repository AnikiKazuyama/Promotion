import { NextRouter } from 'next/router';

type PushToCityConf = {
    lat: number
    lon: number
    name: string
}

const pushToCity = (router: NextRouter, {
    lat,
    lon,
    name
}: PushToCityConf) => {
    router.push({
        href: router.pathname,
        query: {
            lat,
            lon,
            cityName: name
        }
    }, name.toLowerCase().replace(/ /g, '-'));
};

export default pushToCity;
