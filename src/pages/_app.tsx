import { PageLoadingProvider } from 'app/Weather/context/pageLoading';
import { LocationProvider } from 'app/Weather/context/location';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Styles from 'styles';
import i18n, { useChangeTranslation } from 'utils/translation';
import { I18nextProvider } from 'react-i18next';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * The root component
 */
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    useChangeTranslation();
    return (
        <>
            <Styles />
            <I18nextProvider i18n={i18n}>
                <PageLoadingProvider>
                    <LocationProvider initialState={{ ...pageProps.initialState }}>
                        <Component {...pageProps} />
                    </LocationProvider>
                </PageLoadingProvider>
            </I18nextProvider>
        </>
    );
}

export default MyApp;
