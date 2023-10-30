import { ConferenceList } from '@/app/models/spreadsheet-model';
import PublicGoogleSheetsParser from 'public-google-sheets-parser';
import './body.scss';
import { compareConferenceDates } from '@/shared/utils/date-utils';
import Conferences from './conference-list/conference-list';

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
    <div className='page-body'>
      <aside>Filters</aside>

      <section className='conference-list'>
        <Conferences conferences={conferences} />
      </section>
    </div>
  );
};

export default Body;
