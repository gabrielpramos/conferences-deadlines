import { ConferencesList } from '@/app/models/spreadsheet-model';
import PublicGoogleSheetsParser from 'public-google-sheets-parser';
import './body.scss';
import { compareConferenceDates } from '@/shared/utils/date-utils';
import Conferences from './conference-list/conference-list';
import PageFilters from './page-filters/page-filters';
import { FiltersGroup } from '@/app/models/filter-model';
import { getConferencesList, getFiltersGroup } from './conferences-utils';

const Body = async () => {
  const conferences: ConferencesList = await getConferencesList();

  const filtersGroup: FiltersGroup = getFiltersGroup(conferences);

  return (
    <div className='page-body'>
      <PageFilters filtersGroup={filtersGroup} />

      <section className='conference-list'>
        <Conferences conferences={conferences} />
      </section>
    </div>
  );
};

export default Body;
