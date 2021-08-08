import { usePageLoading } from 'app/Weather/context/pageLoading';
import CloudyLoader from 'app/Weather/components/elemets/Loaders/Cloudy';
import { observer } from 'mobx-react-lite';

const WeatherRoute = observer(({ children }) => {
    const pageLoadingStore = usePageLoading();
    return pageLoadingStore.isLoading ? <CloudyLoader /> : <>{children}</>;
});

export default WeatherRoute;
