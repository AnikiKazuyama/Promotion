import BaseLayout from '../layouts/Base';
import InDetailsDaysList from '../modules/Statistics/TenDays/InDetails';

const InDetails = ({ geoposition }: any) => (
    <BaseLayout>
        <InDetailsDaysList />
    </BaseLayout>
);

export default InDetails;
