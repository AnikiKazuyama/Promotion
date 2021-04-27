import dayjs, { ConfigType } from 'dayjs';
import { isNumber } from 'lodash';
import {
    action, computed, makeObservable, observable
} from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';

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
        const correctTime = isNumber(time) ? time * 1000 : time;
        return dayjs(correctTime).tz(this.location.timezone);
    }
}

let store: LocationsStore;
const initializeStore = (initialData: Location) => {
    if (typeof window === 'undefined') {
        const privateStore = new LocationsStore();
        privateStore.setLocation(initialData);
        return privateStore;
    }
    if (store === undefined) {
        store = new LocationsStore();
        store.setLocation(initialData);
    }
    if (store) {
        store.setLocation(initialData);
    }

    return store;

    // const privateStore = store || new LocationsStore();
    // if (initialData) {
    //     privateStore.setLocation(initialData);
    // }

    // // For SSG and SSR always create a new store
    // if (typeof window === 'undefined') return privateStore;
    // // Create the store once in the client
    // if (!store) store = privateStore;

    // return privateStore;
};

export default initializeStore;
