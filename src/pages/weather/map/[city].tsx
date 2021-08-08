import BaseLayout from 'app/Weather/components/layouts/Base';
import WeatherRoute from 'app/Weather/components/modules/Route';
import getServerSideProps from 'app/Weather/components/modules/Statistics/utils/ssr';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('app/Weather/components/modules/Statistics/Map'), { ssr: false });

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
