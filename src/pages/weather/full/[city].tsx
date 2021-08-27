import BaseLayout from 'app/components/layouts/Base';
import WeatherRoute from 'app/components/modules/Route';
import { DetailsDaysList, WeatherListProps } from 'app/components/modules/WeatherPrediction';
import getServerSideProps from 'app/components/modules/WeatherPrediction/ssr/getServerSideProps';

/**
 * Render full day statistics
 */
export default function FullDayStatistics({ weatherList }: WeatherListProps) {
    return (
        <BaseLayout>
            <WeatherRoute>
                <DetailsDaysList weatherList={weatherList} />
            </WeatherRoute>
        </BaseLayout>
    );
}

/**
 * Get client geolocation and passing it to component
 */
export { getServerSideProps };
