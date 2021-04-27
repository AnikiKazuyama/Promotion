import { PageLoadingProvider } from 'app/Weather/context/pageLoading';
import { LocationProvider } from 'app/Weather/context/location';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Styles from 'styles';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * The root component
 */
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Styles />
            <PageLoadingProvider>
                <LocationProvider initialState={{ ...pageProps.initialState }}>
                    <Component {...pageProps} />
                </LocationProvider>
            </PageLoadingProvider>

        </>
    );
}

export default MyApp;
