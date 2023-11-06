'use client';

import {
  FilterCategories,
  FilterType,
  ServerFilterObject,
} from '@/app/models/filter-model';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { URLSearchParamIndividual } from '../../conferences-utils';
import { SEARCH_SEPARATOR_CHARACTER } from '@/shared/constants/strings';

const NO_CONFERENCES_FOR_THE_CATEGORY = 0;

interface CheckboxFiltersProps {
  filters: ServerFilterObject;
}

type Filter = {
  name: string;
  checked: boolean;
};
type FiltersState = Array<
  Filter & {
    areas: Filter[];
  }
>;

const CheckboxFilters: FC<CheckboxFiltersProps> = ({
  filters: { filterAreasList, filterCounts },
}) => {
  const router = useRouter();
  const {
    [FilterCategories.GreatArea]: selectedGreatAreas = '',
    [FilterCategories.Area]: selectedAreas = '',
    ...restSearchParams
  } = router.query as URLSearchParamIndividual;

  const isSelectedGreatArea = (greatAreaName: string) =>
    (selectedGreatAreas as string)
      .split(SEARCH_SEPARATOR_CHARACTER)
      .some((name: string) => name === greatAreaName);

  const isSelectedArea = (areaName: string) =>
    (selectedAreas as string)
      .split(SEARCH_SEPARATOR_CHARACTER)
      .some((areaNameURL: string) => areaNameURL === areaName);

  const greatAreasList = Object.entries(filterAreasList).map(
    ([key, value]) => ({
      name: key,
      checked: isSelectedGreatArea(key),
      areas: value.map((name) => ({
        name,
        checked: isSelectedArea(name),
      })),
    })
  );

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

    router.push({
      pathname: router.pathname,
      query: {
        ...restQuery,
        ...query,
      },
    });
  };

  return (
    <>
      {greatAreasList.map(({ name: greatAreaName, areas, checked }) => (
        <details key={greatAreaName} open>
          <summary>
            <input
              type='checkbox'
              id={greatAreaName}
              defaultChecked={checked}
              onChange={({ target: { checked } }) => {
                onChangeFilter(
                  FilterCategories.GreatArea,
                  greatAreaName,
                  checked
                );
              }}
            />
            <span>({filterCounts[greatAreaName]?.total ?? 0})</span>

            <label htmlFor={greatAreaName}>{greatAreaName}</label>
          </summary>

          <div className='areas-filters-group'>
            {areas.map(({ name: areaName, checked }) => (
              <div className='filter-element' key={areaName}>
                <span>
                  (
                  {filterCounts[greatAreaName]?.[areaName] ??
                    NO_CONFERENCES_FOR_THE_CATEGORY}
                  )
                </span>

                <input
                  type='checkbox'
                  value={areaName}
                  id={areaName}
                  onChange={({ target: { checked } }) => {
                    onChangeFilter(FilterCategories.Area, areaName, checked);
                  }}
                  defaultChecked={checked}
                />

                <label htmlFor={areaName}>{areaName}</label>
              </div>
            ))}
          </div>
        </details>
      ))}
    </>
  );
};

export default CheckboxFilters;
