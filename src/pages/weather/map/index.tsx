import { GetServerSideProps } from 'next';
import { AddressInfo } from 'node:net';

import geoip from 'geoip-lite';

// eslint-disable-next-line
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const addressLookup = req.socket.address() as Partial<AddressInfo>;
    const geoLookup = geoip.lookup(addressLookup.address);

    if (addressLookup && addressLookup.address && geoLookup) {
        return {
            redirect: {
                destination: `/weather/map/${geoLookup.city.toLowerCase().replace(' ', '-')}`,
                permanent: true
            }
        };
    }

    return {
        redirect: {
            destination: '/weather/map/san-antonio',
            permanent: true
        }
    };
};

const Page = () => null;
export default Page;
