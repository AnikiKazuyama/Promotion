import BaseLayout from 'app/Weather/components/layouts/Base';
import WeatherRoute from 'app/Weather/components/modules/Route';
import DetailsDaysList, { DetailsDayListProps } from 'app/Weather/components/modules/Statistics/TenDays/pages/InDetails';
import getServerSideProps from 'app/Weather/components/modules/Statistics/utils/ssr';

/**
 * Render full day statistics
 */
export default function FullDayStatistics({
    weatherList
}: DetailsDayListProps): JSX.Element {
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
