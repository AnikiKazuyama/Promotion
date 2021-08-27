import dayjs, { ConfigType } from 'dayjs';
import { isNumber } from 'lodash';
import {
    action, makeObservable, observable
} from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import { useEffect } from 'react';

export type Location = {
    city: string,
    coordinates: [number, number]
    country: string,
    timezone: string
}

enableStaticRendering(typeof window === 'undefined');

export class LocationsStore {
    location: Location = {
        city: '',
        coordinates: [0, 0],
        country: '',
        timezone: 'Europe/Moscow'
    };

    constructor() {
        makeObservable(this, {
            location: observable,
            setLocation: action
        });
    }

    setLocation = (location: Location) => {
        this.location = location;
    }

    getLocation() {
        return this.location;
    }

    getTimeInLocation(time?: ConfigType) {
        const correctTime = time && isNumber(time) ? time * 1000 : dayjs(time);
        return dayjs(correctTime).tz(this.location.timezone);
    }
}

let store: LocationsStore;
const useInitializeStore = (initialData: Location) => {
    const privateStore = store || new LocationsStore();
    useEffect(() => {
        if (initialData) {
            privateStore.setLocation(initialData);
        }
    }, [initialData, privateStore]);

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return privateStore;
    // Create the store once in the client
    if (!store) store = privateStore;

    return privateStore;
};

export default useInitializeStore;
