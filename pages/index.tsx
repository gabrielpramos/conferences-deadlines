import './index.scss';

import Header from '@/shared/components/header/header';
import Footer from '@/shared/components/footer/footer';
import Body from '@/shared/components/body/body';
import { GetServerSidePropsContext } from 'next/types';
import {
  getConferencesList,
  treatAndFilterData,
} from '@/shared/components/body/conferences-utils';
import { ConferencesList } from '@/app/models/spreadsheet-model';
import { FC, Suspense } from 'react';
import Head from '@/shared/components/head/head';
import { ServerFilterObject } from '@/app/models/filter-model';

export interface HomePageProps {
  conferences: ConferencesList;
  filters: ServerFilterObject;
}

const HomePage: FC<HomePageProps> = ({ conferences, filters }) => (
  <Suspense fallback={<h1>loading</h1>}>
    <Head />

    <main className='main'>
      <Header />

      <Body conferences={conferences} filters={filters} />

      <Footer />
    </main>
  </Suspense>
);

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const conferences: ConferencesList = await getConferencesList();

  const { treatedConferences, filters } = treatAndFilterData(
    query,
    conferences
  );

  return {
    props: {
      conferences: treatedConferences,
      filters: filters as ServerFilterObject,
    },
  };
}

export default HomePage;
