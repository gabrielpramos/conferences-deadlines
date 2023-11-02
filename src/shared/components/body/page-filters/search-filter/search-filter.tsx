'use client';

import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { FilterCategories } from '@/app/models/filter-model';
import texts from '@/shared/constants/texts';
import { useRouter } from 'next/router';
import debouce from 'lodash.debounce';

const SearchFilter: FC = () => {
  const router = useRouter();
  const [filterValue, setFilterValue] = useState<string>(
    (router.query[FilterCategories.Search] as string) ?? ''
  );

  const updateRoute = () => {
    const { [FilterCategories.Search]: previousSearch, ...restQuery } =
      router.query;
    const query = restQuery;

    if (filterValue) {
      query[FilterCategories.Search] = filterValue;
    }

    router.push({
      pathname: router.pathname,
      query,
    });
  };

  const debounceValue = debouce(updateRoute, 300);

  useEffect(() => {
    debounceValue();

    return () => {
      debounceValue.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue]);

  const onChangeSearch: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setFilterValue(value);
  };

  return (
    <input
      type='search'
      value={filterValue}
      onChange={onChangeSearch}
      placeholder={texts.body.filterSearchPlaceholder}
      onKeyDown={({ key }) => {
        if (key === 'Enter') {
          debounceValue();
        }
      }}
    />
  );
};

export default SearchFilter;
