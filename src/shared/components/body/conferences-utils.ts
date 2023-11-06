import {
  FilterCategories,
  FiltersAreas,
  FiltersGroup,
} from '@/app/models/filter-model';
import {
  ConferenceAreaList,
  ConferenceInfo,
  ConferencesList,
} from '@/app/models/spreadsheet-model';
import { SEARCH_SEPARATOR_CHARACTER } from '@/shared/constants/strings';
import { compareConferenceDates } from '@/shared/utils/date-utils';
import Papa from 'papaparse';
import PublicGoogleSheetsParser from 'public-google-sheets-parser';

export const getConferencesList = (
  sheetUrl: string,
  updateConferencesList: (conferences: ConferencesList) => void
) => {
  Papa.parse<string[]>(sheetUrl, {
    download: true,
    complete: ({ data: [headers, ...valuesLists] }) => {
      const conferences = valuesLists
        .map((values) =>
          values.reduce(
            (acc, value, index) => ({
              ...acc,
              [headers[index]]:
                headers[index] === 'DeadlineISO' ? new Date(value) : value,
            }),
            {} as ConferenceInfo
          )
        )
        .sort((firstConference, secondConference) =>
          compareConferenceDates(
            firstConference.DeadlineISO,
            secondConference.DeadlineISO
          )
        );
      updateConferencesList(conferences);
    },
  });
};

export const getConferencesAreasList = (
  sheetUrl: string,
  updateConferencesAreasList: (areasList: ConferenceAreaList) => void
) => {
  Papa.parse<string[]>(sheetUrl, {
    download: true,
    complete: ({ data: [headers, ...valuesLists] }) => {
      const conferencesAreasList = valuesLists.map((values) =>
        values.reduce(
          (acc, value, index) => ({ ...acc, [headers[index]]: value }),
          {} as ConferenceInfo
        )
      );

      updateConferencesAreasList(conferencesAreasList);
    },
  });
};

export type URLSearchParamIndividual = { [x: string]: string | undefined };

export const treatDataFilters = (
  conferences: ConferencesList,
  conferencesAreasList: ConferenceAreaList
) => {
  const FILTER_STARTING_VALUE = 0;
  const FILTER_INCREMENT_VALUE = 1;

  const filterCounts = conferences.reduce((acc, { GreatArea, Area }) => {
    acc[GreatArea] ??= {};
    acc[GreatArea].total ??= FILTER_STARTING_VALUE;
    acc[GreatArea].total += FILTER_INCREMENT_VALUE;

    acc[GreatArea][Area] ??= FILTER_STARTING_VALUE;
    acc[GreatArea][Area] += FILTER_INCREMENT_VALUE;

    return acc;
  }, {} as FiltersGroup);

  const filterAreasList = conferencesAreasList.reduce(
    (acc, { GreatArea, Area }) => {
      acc[GreatArea] ??= [Area];
      if (!acc[GreatArea].find((area) => area === Area)) {
        acc[GreatArea] = [...acc[GreatArea], Area];
      }

      return acc;
    },
    {} as FiltersAreas
  );

  return {
    filters: {
      filterCounts,
      filterAreasList,
    },
  };
};

export const filterConferences = (
  query: URLSearchParamIndividual,
  conferences: ConferencesList
) => {
  const {
    [FilterCategories.GreatArea]: selectedGreatAreas = '',
    [FilterCategories.Area]: selectedAreas = '',
    [FilterCategories.Search]: searchQuery,
  } = query as URLSearchParamIndividual;

  const appliedGreatAreas = (selectedGreatAreas as string).split(
    SEARCH_SEPARATOR_CHARACTER
  );
  const appliedAreas = (selectedAreas as string).split(
    SEARCH_SEPARATOR_CHARACTER
  );
  const validateCheckboxesFilters = (greatArea: string, area: string) =>
    (appliedGreatAreas.every((filter) => filter === '') &&
      appliedAreas.every((filter) => filter === '')) ||
    appliedGreatAreas.some((greatAreaName) => greatAreaName === greatArea) ||
    appliedAreas.some((areaName) => areaName === area);

  const validateSearchFilter = (conferenceName: string) =>
    !Boolean(searchQuery) ||
    conferenceName
      .toLowerCase()
      .includes((searchQuery as string).toLowerCase());

  return conferences
    .filter(({ Conference }) => validateSearchFilter(Conference))
    .filter(({ GreatArea, Area }) =>
      validateCheckboxesFilters(GreatArea, Area)
    );
};
