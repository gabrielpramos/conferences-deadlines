'use client';

import Link from 'next/link';
import { ConferencesList } from '@/app/models/spreadsheet-model';
import { FC } from 'react';
import ConferenceLocation from '../conference-location/conference-location';
import CountdownDetails from '../countdown-details/countdown-details';
import texts from '@/shared/constants/texts';

interface ConferencesListProps {
  conferences: ConferencesList;
}

const Conferences: FC<ConferencesListProps> = ({ conferences }) => (
  <>
    {conferences.length > 0 ? (
      conferences?.map((conference, index) => (
        <article
          className='card'
          key={`conference-${index}`}
          style={{ marginBottom: '10px' }}
        >
          <div className='card-detail'>
            <Link
              href={conference.WebSite ?? '/'}
              target='_blank'
              title={conference.WebSite ?? 'No webpage listed'}
            >
              <h2>{conference.Conference}</h2>
            </Link>

            <h4 className='description'>{conference.ConferenceDetail}</h4>

            <p className='category-conference-area'>
              {conference.GreatArea} - {conference.Area}
            </p>
          </div>

          <aside className='date-and-place-details'>
            <p>
              <time dateTime={conference.ConferenceDates}>
                {conference.ConferenceDates}
              </time>
            </p>

            <p>
              <ConferenceLocation location={conference.Location} />
            </p>
          </aside>

          <CountdownDetails
            detail={conference.Detail}
            deadlineISO={conference.DeadlineISO}
          />
        </article>
      ))
    ) : (
      <article className='card no-conferences-found'>
        <h3>{texts.body.noConferencesText}</h3>
      </article>
    )}
  </>
);

export default Conferences;
