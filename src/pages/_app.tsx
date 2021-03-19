import { AppProps } from 'next/dist/next-server/lib/router/router';
import Styles from 'styles';

/**
 * The root component
 */
function MyApp({ Component }: AppProps): JSX.Element {
    return (
        <>
            <Styles />
            <Component />
        </>
    );
}

export default MyApp;
