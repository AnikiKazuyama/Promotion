import BaseLayout from 'app/components/layouts/Base';
import WeatherRoute from 'app/components/modules/Route';
import getServerSideProps from 'app/components/modules/WeatherPrediction/ssr/getServerSideProps';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('app/components/modules/Map'), { ssr: false });

/**
 *
 */
export default function WeatherShort() {
    return (
        <BaseLayout>
            <WeatherRoute>
                <DynamicMap />
            </WeatherRoute>
        </BaseLayout>
    );
}

/**
 * Get client geolocation and passing it to component
 */
export { getServerSideProps };
