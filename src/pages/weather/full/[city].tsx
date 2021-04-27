import BaseLayout from 'app/Weather/components/layouts/Base';
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
            <DetailsDaysList weatherList={weatherList} />
        </BaseLayout>
    );
}

/**
 * Get client geolocation and passing it to component
 */
export { getServerSideProps };
