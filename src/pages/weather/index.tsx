import getServerSidePropsForIndexPages from 'app/common/ssr';
import BlankPage from 'app/components/modules/BlankPage';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = (ssrProps) => getServerSidePropsForIndexPages('/weather', '/weather/san-antonio')(ssrProps);

export default BlankPage;
