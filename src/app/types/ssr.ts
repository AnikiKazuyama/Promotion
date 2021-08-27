import { AnyType } from 'app/common/types';
import { Location } from 'app/context/location/store';
import { GetServerSideProps } from 'next';
import { Assign } from 'utility-types';

// eslint-disable-next-line
export type getServerSidePropsHandler<PageProps extends Record<string, AnyType> = {}> =
    GetServerSideProps<Assign<PageProps, {initialState: Location}>>;
