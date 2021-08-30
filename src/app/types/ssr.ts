import { Location } from 'app/context/location/store';
import { CitySuggestWithTimeZone } from 'app/services/types/findCityByQuery';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

type InitialStateType = {initialState: Location}

// eslint-disable-next-line
export type getServerSidePropsHandlerWithCityRequired = (context: GetServerSidePropsContext, city: CitySuggestWithTimeZone) => Promise<GetServerSidePropsResult<InitialStateType>>
