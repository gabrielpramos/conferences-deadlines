'use client';

import texts from '@/shared/constants/texts';
import { FC } from 'react';
import SearchFilter from './search-filter/search-filter';
import CheckboxFilters from './checkbox-filters/checkbox-filters';
import {
  ConferenceAreaList,
  ConferencesList,
} from '@/app/models/spreadsheet-model';
import { treatDataFilters } from '../conferences-utils';

interface PageFiltersProps {
  conferences: ConferencesList;
  conferencesAreasList: ConferenceAreaList;
}

const PageFilters: FC<PageFiltersProps> = ({
  conferences,
  conferencesAreasList,
}) => {
  const { filters } = treatDataFilters(conferences, conferencesAreasList);

  return (
    <aside className='filters'>
      <h3>{texts.body.filterTitle}</h3>

      <div className='filters-section'>
        <h4 className='category-filter-section-title'>
          {texts.body.filterConferenceName}
        </h4>

        <SearchFilter />

        <div className='category-filter-section'>
          <h4 className='category-filter-section-title'>
            {texts.body.filterCategories}
          </h4>

          <CheckboxFilters filters={filters} />
        </div>
      </div>
    </aside>
  );
};

export default PageFilters;
