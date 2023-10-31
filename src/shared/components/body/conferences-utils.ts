import { FiltersGroup } from '@/app/models/filter-model';
import { ConferencesList } from '@/app/models/spreadsheet-model';
import { compareConferenceDates } from '@/shared/utils/date-utils';
import PublicGoogleSheetsParser from 'public-google-sheets-parser';

export const getConferencesList = () => {
  const fileId = process.env.SHEET_ID as string;
  const sheetName = process.env.SHEET_NAME as string;

  return new PublicGoogleSheetsParser(fileId, {
    sheetName,
  })
    .parse()
    .then<ConferencesList>((data) =>
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
};

export const getFiltersGroup = (conferences: ConferencesList) => {
  const FILTER_STARTING_VALUE = 1;
  const FILTER_INCREMENT_VALUE = 1;

  return conferences.reduce((acc, { GreatArea, Area }) => {
    if (!acc[GreatArea]) {
      acc[GreatArea] = {};
    }

    if (!acc[GreatArea][Area]) {
      acc[GreatArea][Area] = FILTER_STARTING_VALUE;
    }

    return {
      ...acc,
      [GreatArea]: {
        ...acc[GreatArea],
        [Area]: acc[GreatArea][Area] + FILTER_INCREMENT_VALUE,
      },
    };
  }, {} as FiltersGroup);
};
