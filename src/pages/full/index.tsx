import { GetServerSideProps } from 'next';
import getServerSidePropsForIndexPage from 'app/common/ssr';
import BlankPage from 'app/components/modules/BlankPage';

export const getServerSideProps: GetServerSideProps = (ssrProps) => getServerSidePropsForIndexPage('/full', '/full/san-antonio')(ssrProps);

export default BlankPage;
