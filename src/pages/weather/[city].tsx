import BaseLayout from 'app/Weather/components/layouts/Base';
import DaysList, { DetailsDayListProps } from 'app/Weather/components/modules/Statistics/TenDays/pages/Short';

import getServerSideProps from 'app/Weather/components/modules/Statistics/utils/ssr';

/**
 *
 */
export default function WeatherShort({ weatherList }: DetailsDayListProps): JSX.Element {
    return (
        <BaseLayout>
            <DaysList weatherList={weatherList} />
        </BaseLayout>
    );
}

/**
 * Get client geolocation and passing it to component
 */
export { getServerSideProps };
