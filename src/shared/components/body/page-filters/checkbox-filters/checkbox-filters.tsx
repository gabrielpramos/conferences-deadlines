'use client';

import {
  FilterCategories,
  ServerFilterObject,
} from '@/app/models/filter-model';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
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

  const initialState = Object.entries(filterAreasList).map(([key, value]) => ({
    name: key,
    checked: isSelectedGreatArea(key),
    areas: value.map((name) => ({
      name,
      checked: isSelectedArea(name),
    })),
  }));

  const getFiltersStates = () =>
    Object.entries(filterAreasList).map(([key, value]) => ({
      name: key,
      checked: isSelectedGreatArea(key),
      areas: value.map((name) => ({
        name,
        checked: isSelectedArea(name),
      })),
    }));

  const [filtersState, setFiltersState] = useState<FiltersState>(initialState);

  const mapFilters = (
    filters: Filter[] | FiltersState,
    name: string,
    checked: boolean
  ) =>
    filters.map((filter) => {
      if (filter.name === name) {
        return { ...filter, checked };
      }

      return filter;
    });

  const onChangeGreatAreaFilter = ({ name, checked }: Filter) => {
    const updateFilters = {} as URLSearchParamIndividual;
    const newSelectedGreatArea = `${name}${SEARCH_SEPARATOR_CHARACTER}`;
    const removedFilter = selectedGreatAreas.replace(
      `${newSelectedGreatArea}`,
      ''
    );

    if (!checked && removedFilter.length > 0) {
      updateFilters[FilterCategories.GreatArea] = removedFilter;
    } else {
      updateFilters[
        FilterCategories.GreatArea
      ] = `${selectedGreatAreas}${newSelectedGreatArea}`;
    }

    setFiltersState(mapFilters(filtersState, name, checked) as FiltersState);

    router.push(router.pathname, {
      query: {
        [FilterCategories.Area]: selectedAreas,
        ...restSearchParams,
      },
    });
  };

  const onChangeAreaFilter = ({
    name,
    checked,
    filterParent,
  }: Filter & { filterParent: string }) => {
    const updateFilters = {} as URLSearchParamIndividual;
    const newSelectedArea = `${name}${SEARCH_SEPARATOR_CHARACTER}`;
    const removedFilter = selectedAreas.replace(`${newSelectedArea}`, '');

    if (!checked && removedFilter.length > 0) {
      updateFilters[FilterCategories.Area] = removedFilter;
    } else {
      updateFilters[
        FilterCategories.Area
      ] = `${selectedGreatAreas}${newSelectedArea}`;
    }

    setFiltersState(
      filtersState.map((filterElement) => {
        if (filterElement.name === filterParent) {
          return {
            ...filterElement,
            areas: mapFilters(filterElement.areas, name, checked),
          };
        }
        return filterElement;
      })
    );

    router.push(router.pathname, {
      query: {
        [FilterCategories.GreatArea]: selectedGreatAreas,
        ...restSearchParams,
      },
    });
  };

  return (
    <>
      {filtersState.map(({ name: greatAreaName, areas, checked }) => (
        <details key={greatAreaName} open>
          <summary>
            <input
              type='checkbox'
              id={greatAreaName}
              checked={checked}
              onChange={({ target: { checked } }) => {
                onChangeGreatAreaFilter({
                  name: greatAreaName,
                  checked,
                } as Filter);
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
                    onChangeAreaFilter({
                      name: areaName,
                      filterParent: greatAreaName,
                      checked,
                    } as Filter & { filterParent: string });
                  }}
                  checked={checked}
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
