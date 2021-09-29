import BaseLayout from 'app/components/layouts/Base';
import WeatherRoute from 'app/components/modules/Route';
import { DaysList, WeatherListProps } from 'app/components/modules/WeatherPrediction';

import getServerSideProps from 'app/components/modules/WeatherPrediction/ssr/getServerSideProps';

/**
 *
 */
export default function WeatherShort({ weatherList }: WeatherListProps) {
    return (
        <BaseLayout>
            <WeatherRoute>
                <DaysList weatherList={weatherList} />
            </WeatherRoute>
        </BaseLayout>
    );
}

/**
 * Get client geolocation and passing it to component
 */
export { getServerSideProps };
