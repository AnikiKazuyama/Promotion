import { PageLoadingProvider } from 'app/context/pageLoading';
import { LocationProvider } from 'app/context/location';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Styles from 'styles';
import i18n, { useChangeTranslation } from 'app/utils/translation';
import { I18nextProvider } from 'react-i18next';
import 'dayjs/locale/ru';
import Head from 'next/head';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * The root component
 */
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    useChangeTranslation();
    return (
        <>
            <Head>
                <title>Aniki.Погода</title>
                <meta property="og:title" content="Прогноз погоды" />
                <meta property="og:description" content="Приложение предоставляющее информацию о прогнозе погоды" />
                <meta property="og:image" content="/static/images/og_image.jpg" />
                <meta property="og:image:type" content="image/jpg" />
                <meta property="og:site_name" content="Aniki.Погода" />
            </Head>
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
