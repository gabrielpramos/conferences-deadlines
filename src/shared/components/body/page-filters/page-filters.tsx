'use client';

import {
  FilterCategories,
  FilterType,
  FiltersGroup,
} from '@/app/models/filter-model';
import texts from '@/shared/constants/texts';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { HomePageProps } from '../../../../../pages';
import SearchFilter from './search-filter/search-filter';

interface PageFiltersProps extends Pick<HomePageProps, 'filters'> {
  filtersGroup: FiltersGroup;
}

const SEARCH_SEPARATOR_CHARACTER = ';';

const PageFilters: FC<PageFiltersProps> = ({
  filtersGroup,
  filters: { appliedAreas, appliedGreatAreas, search },
}) => {
  const router = useRouter();
  const greatAreasList = Object.keys(filtersGroup);

  const onChangeFilter = (
    filterKey: FilterCategories,
    filterValue: string,
    checked: boolean
  ) => {
    const { [filterKey]: previousSelcectedFilters, ...restQuery } =
      router.query;
    const query: FilterType = {};

    if (checked) {
      query[filterKey] = `${previousSelcectedFilters ?? ''}${filterValue};`;
    } else {
      const filterSet = String(previousSelcectedFilters ?? '')
        .split(SEARCH_SEPARATOR_CHARACTER)
        .filter((previousFilter) => previousFilter !== filterValue)
        .join(SEARCH_SEPARATOR_CHARACTER);

      if (filterSet.length > 0) {
        query[filterKey] = filterSet;
      }
    }

    router.replace({
      pathname: router.pathname,
      query: {
        ...restQuery,
        ...query,
      },
    });
  };

  return (
    <aside className='filters'>
      <h3>{texts.body.filterTitle}</h3>

      <div className='filters-section'>
        <SearchFilter value={search} />

        {greatAreasList.map((filterGroup) => (
          <details key={filterGroup} open>
            <summary>
              <input
                type='checkbox'
                id='greatArea'
                onChange={({ target: { checked } }) => {
                  onChangeFilter(
                    FilterCategories.GreatArea,
                    filterGroup,
                    checked
                  );
                }}
                defaultChecked={appliedGreatAreas.some(
                  (greatAreaName) => greatAreaName === filterGroup
                )}
              />

              <span>{filterGroup}</span>
            </summary>

            <div className='areas-filters-group'>
              {Object.entries(filtersGroup[filterGroup]).map(([key, value]) => (
                <div className='filter-element' key={key}>
                  <span>({value})</span>

                  <input
                    type='checkbox'
                    value={key}
                    id={key}
                    onChange={({ target: { checked } }) => {
                      onChangeFilter(FilterCategories.Area, key, checked);
                    }}
                    defaultChecked={appliedAreas.some(
                      (areaName) => areaName === key
                    )}
                  />

                  <label htmlFor={key}>{key}</label>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </aside>
  );
};

export default PageFilters;
