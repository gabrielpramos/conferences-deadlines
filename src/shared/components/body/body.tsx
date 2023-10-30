import { ConferenceInfo, ConferenceList } from '@/app/models/spreadsheet-model';
import Link from 'next/link';
import PublicGoogleSheetsParser from 'public-google-sheets-parser';
import './body.scss';
import ConferenceLocation from './conference-location/conference-location';
import CountdownDetails from './countdown-details/countdown-details';
import { compareConferenceDates } from '@/shared/utils/date-utils';

const Body = async () => {
  const fileId = process.env.SHEET_ID as string;
  const sheetName = process.env.SHEET_NAME as string;

  const conferences: ConferenceList = await new PublicGoogleSheetsParser(
    fileId,
    {
      sheetName,
    }
  )
    .parse()
    .then<ConferenceList>((data) =>
      data
        .map(({ DeadlineISO, ...restParams }) => {
          const treatedConference = restParams;

          if (DeadlineISO) {
            const [
              yearDeadlineISO,
              monthDeadlineISO,
              dayDeadlineISO,
              hourDeadlineISO,
              minuteDeadlineISO,
              secondDeadlineISO,
            ] = DeadlineISO.replaceAll(/[Date()]/g, '')
              .split(',')
              .map(Number);

            treatedConference.DeadlineISO = new Date(
              yearDeadlineISO,
              monthDeadlineISO,
              dayDeadlineISO,
              hourDeadlineISO,
              minuteDeadlineISO,
              secondDeadlineISO
            ).getTime();
          }

          return treatedConference;
        })
        .sort((firstConference, secondConference) =>
          compareConferenceDates(
            firstConference.DeadlineISO,
            secondConference.DeadlineISO
          )
        )
    );

  return (
    <section className='conference-list'>
      {conferences?.map((conference, index) => (
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
      ))}
    </section>
  );
};

export default Body;
