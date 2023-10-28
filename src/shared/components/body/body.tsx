import { ConferenceList } from '@/app/models/spreadsheet-model';
import Link from 'next/link';
import PublicGoogleSheetsParser from 'public-google-sheets-parser';
import './body.scss';
import ConferenceLocation from './conference-location/conference-location';
import CountdownDetails from './countdown-details/countdown-details';

const Body = async () => {
  const fileId = process.env.SHEET_ID as string;
  const sheetName = process.env.SHEET_NAME as string;

  const conferences: ConferenceList = await new PublicGoogleSheetsParser(
    fileId,
    {
      sheetName,
    }
  ).parse();

  return (
    <article className='conference-list'>
      {conferences?.map((conference, index) => (
        <section
          className='card'
          key={`conference-${index}`}
          style={{ marginBottom: '10px' }}
        >
          <div className='card-detail'>
            <Link href={conference.WebSite ?? '/'} target='_blank'>
              <h2>{conference.Conference}</h2>
            </Link>

            <p className='description'>{conference.ConferenceDetail}</p>

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

          <aside className='countdown-details'>
            <CountdownDetails
              deadline={conference.Deadline}
              deadlineISO={conference.DeadlineISO}
              deadlineTimeZone={conference.DeadlineTimeZone}
            />
          </aside>
        </section>
      ))}
    </article>
  );
};

export default Body;
