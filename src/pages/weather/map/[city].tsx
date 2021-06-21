import BaseLayout from 'app/Weather/components/layouts/Base';
import getServerSideProps from 'app/Weather/components/modules/Statistics/utils/ssr';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('app/Weather/components/modules/Statistics/Map'), { ssr: false });

/**
 *
 */
export default function WeatherShort() {
    return (
        <BaseLayout>
            <DynamicMap />
        </BaseLayout>
    );
}

/**
 * Get client geolocation and passing it to component
 */
export { getServerSideProps };
