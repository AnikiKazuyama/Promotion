import { GetServerSideProps } from 'next';

import BlankPage from 'app/components/modules/BlankPage';
import getServerSidePropsForIndexPages from 'app/common/ssr';

export const getServerSideProps: GetServerSideProps = (ssrProps) => getServerSidePropsForIndexPages('/map', '/map/san-antonio')(ssrProps);

export default BlankPage;
