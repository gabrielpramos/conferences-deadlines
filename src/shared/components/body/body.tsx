/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import './body.scss';
import Conferences from './conference-list/conference-list';
import { FC, useEffect, useState } from 'react';
import { useAppContext } from '../../../../pages';
import {
  ConferenceAreaList,
  ConferencesList,
} from '@/app/models/spreadsheet-model';
import {
  URLSearchParamIndividual,
  filterConferences,
  getConferencesAreasList,
  getConferencesList,
} from './conferences-utils';
import PageFilters from './page-filters/page-filters';
import { useRouter } from 'next/router';
import { addMinutes, isAfter } from 'date-fns';

const UPDATE_AMOUNT_MINUTES = 5;
const HOUR_AMOUNT_MINUTES = 60;
const UPDATE_AMOUNT_HOURS = HOUR_AMOUNT_MINUTES * 2;

const Body: FC = () => {
  const { query } = useRouter();
  const { sheetUrl, sheetUrlAreas } = useAppContext();
  const [conferencesData, setConferencesData] = useState<{
    conferences: ConferencesList;
    lastUpdate: number;
  }>({ conferences: [], lastUpdate: 0 });
  const [filteredConferences, setFilteredConferences] =
    useState<ConferencesList>([]);
  const [conferencesAreasData, setConferencesAreasData] = useState<{
    lastUpdate: number;
    areasList: ConferenceAreaList;
  }>({ areasList: [], lastUpdate: 0 });

  useEffect(() => {
    const timeToUpdate = (lastUpdate: number, updateAmount: number) =>
      isAfter(
        Date.now(),
        addMinutes(Number(lastUpdate), updateAmount)
      );

    if (
      conferencesAreasData.areasList.length === 0 ||
      timeToUpdate(conferencesAreasData.lastUpdate, UPDATE_AMOUNT_MINUTES)
    ) {
      getConferencesAreasList(
        sheetUrlAreas,
        (areasList: ConferenceAreaList) => {
          setConferencesAreasData({ areasList, lastUpdate: Date.now() });
        }
      );
    }

    if (
      conferencesData.conferences.length === 0 ||
      timeToUpdate(conferencesData.lastUpdate, UPDATE_AMOUNT_HOURS)
    ) {
      getConferencesList(sheetUrl, (conferences: ConferencesList) => {
        setConferencesData(() => ({
          conferences,
          lastUpdate: Date.now(),
        }));
      });
    }

    setFilteredConferences(
      filterConferences(
        query as URLSearchParamIndividual,
        conferencesData.conferences
      )
    );
  }, [
    query,
    JSON.stringify(conferencesData.conferences),
    JSON.stringify(conferencesAreasData.areasList),
  ]);

  return (
    <div className='page-body'>
      <PageFilters
        conferences={conferencesData.conferences}
        conferencesAreasList={conferencesAreasData.areasList}
      />

      <section className='conference-list'>
        <Conferences conferences={filteredConferences} />
      </section>
    </div>
  );
};

export default Body;
