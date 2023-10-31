import { FilterCategories, FiltersGroup } from '@/app/models/filter-model';
import { ConferencesList } from '@/app/models/spreadsheet-model';
import { SEARCH_SEPARATOR_CHARACTER } from '@/shared/constants/strings';
import { compareConferenceDates } from '@/shared/utils/date-utils';
import PublicGoogleSheetsParser from 'public-google-sheets-parser';
import { ParsedUrlQuery } from 'querystring';

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

export const treatAndFilterData = (
  query: ParsedUrlQuery,
  conferences: ConferencesList
) => {
  const FILTER_STARTING_VALUE = 1;
  const FILTER_INCREMENT_VALUE = 1;
  const EMPTY_QUERY_VALUE = '';

  const appliedGreatAreas = (
    (query[FilterCategories.GreatArea] as string) || EMPTY_QUERY_VALUE
  ).split(SEARCH_SEPARATOR_CHARACTER);

  const appliedAreas = (
    (query[FilterCategories.Area] as string) ?? EMPTY_QUERY_VALUE
  ).split(SEARCH_SEPARATOR_CHARACTER);

  const validateCheckboxesFilters = (greatArea: string, area: string) =>
    (appliedGreatAreas.length > 0 && appliedAreas.length > 0) ||
    appliedGreatAreas.some((greatAreaName) => greatAreaName === greatArea) ||
    appliedAreas.some((areaName) => areaName === area);

  const validateSearchFilter = (conferenceName: string) => {
    const searchQuery = query?.[FilterCategories.Search];

    return (
      !Boolean(searchQuery) ||
      conferenceName
        .toLowerCase()
        .includes((searchQuery as string).toLowerCase())
    );
  };

  const treatedConferences = conferences
    .filter(({ GreatArea, Area }) => validateCheckboxesFilters(GreatArea, Area))
    .filter(({ Conference }) => validateSearchFilter(Conference));

  const filterTypes = conferences.reduce((acc, { GreatArea, Area }) => {
    acc[GreatArea] ??= {};
    acc[GreatArea][Area] ??= FILTER_STARTING_VALUE;
    acc[GreatArea][Area] += FILTER_INCREMENT_VALUE;

    return acc;
  }, {} as FiltersGroup);

  return {
    treatedConferences,
    filters: {
      appliedGreatAreas,
      appliedAreas,
      filterTypes,
      search: (query[FilterCategories.Search] ?? EMPTY_QUERY_VALUE) as string,
    },
  };
};
