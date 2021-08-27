import {
    createContext, useContext
} from 'react';
import initializeLocationStore, { LocationsStore, Location } from './store';

const LocationContext = createContext<LocationsStore | undefined>(undefined);

const LocationProvider: React.FC<{initialState: Location}> = ({
    children,
    initialState
}) => {
    const store = initializeLocationStore(initialState);

    return (
        <LocationContext.Provider value={store}>
            {children}
        </LocationContext.Provider>
    );
};

const useLocation = () => {
    const locationStoreContext = useContext(LocationContext);

    if (locationStoreContext === undefined) {
        throw new Error('useLocation must be used within a LocationContext');
    }

    return locationStoreContext;
};

export { LocationProvider, useLocation };
