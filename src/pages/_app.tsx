import { PageLoadingProvider } from 'app/Weather/context/pageLoading';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Styles from 'styles';

/**
 * The root component
 */
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Styles />
            <PageLoadingProvider><Component {...pageProps} /></PageLoadingProvider>
        </>
    );
}

export default MyApp;
