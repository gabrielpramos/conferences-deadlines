'use client';
import './index.scss';

import Header from '@/shared/components/header/header';
import Footer from '@/shared/components/footer/footer';
import Body from '@/shared/components/body/body';
import { GetServerSidePropsContext } from 'next/types';
import { FC, Suspense, createContext, useContext } from 'react';
import Head from '@/shared/components/head/head';

export interface HomePageProps {
  sheetUrl: string;
  sheetUrlAreas: string;
}
const AppContext = createContext<HomePageProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw Error('The component must be under HomePage to use this context');
  }

  return context;
};

const HomePage: FC<HomePageProps> = ({ sheetUrl, sheetUrlAreas }) => (
  <AppContext.Provider value={{ sheetUrl, sheetUrlAreas }}>
    <Suspense fallback={<h1>loading</h1>}>
      <Head />

      <main className='main'>
        <Header />

        <Body />

        <Footer />
      </main>
    </Suspense>
  </AppContext.Provider>
);

export async function getServerSideProps() {
  const sheetUrl = process.env.SHEET_URL as string;
  const sheetUrlAreas = process.env.SHEET_URL_AREAS as string;

  return {
    props: { sheetUrl, sheetUrlAreas },
  };
}

export default HomePage;
