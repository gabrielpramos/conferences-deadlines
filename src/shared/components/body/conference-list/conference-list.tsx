import Link from 'next/link';
import { ConferenceList } from '@/app/models/spreadsheet-model';
import { FC } from 'react';
import ConferenceLocation from '../conference-location/conference-location';
import CountdownDetails from '../countdown-details/countdown-details';

interface ConferenceListProps {
  conferences: ConferenceList;
}

const Conferences: FC<ConferenceListProps> = ({ conferences }) =>
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
        <p>{conference.ConferenceDates}</p>

        <p>
          <ConferenceLocation location={conference.Location} />
        </p>
      </aside>

      <CountdownDetails
        detail={conference.Detail}
        deadlineISO={conference.DeadlineISO}
      />
    </article>
  ));

export default Conferences;
