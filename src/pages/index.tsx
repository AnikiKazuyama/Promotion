import getServerSidePropsForIndexPages from 'app/common/ssr';
import BlankPage from 'app/components/modules/BlankPage';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = (ssrProps) => getServerSidePropsForIndexPages('', '/san-antonio')(ssrProps);

export default BlankPage;
