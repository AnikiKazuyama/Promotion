import { usePageLoading } from 'app/context/pageLoading';
import CloudyLoader from 'app/components/ui/Loaders/Cloudy';
import { observer } from 'mobx-react-lite';

const WeatherRoute = observer(({ children }) => {
    const pageLoadingStore = usePageLoading();
    return pageLoadingStore.isLoading ? <CloudyLoader /> : <>{children}</>;
});

export default WeatherRoute;
