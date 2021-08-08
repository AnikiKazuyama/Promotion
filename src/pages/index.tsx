import Head from 'next/head';
import Link from 'next/link';
import styles from 'styles/Home.module.css';

/**
 *
 * @returns
 */
export default function Home(): JSX.Element {
    return (
        <div className={styles.container}>
            <Head>
                <title>Aniki aka &#34;Ichi&#34; promotion project</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Link href="/weather">
                    <p>Weather app</p>
                </Link>
            </main>
        </div>
    );
}
