'use client';

import { ChangeEventHandler, FC, useEffect } from 'react';
import { FilterCategories } from '@/app/models/filter-model';
import texts from '@/shared/constants/texts';
import { useRouter } from 'next/router';
import debouce from 'lodash.debounce';

interface SearchFilterProps {
  value: string;
}

const SearchFilter: FC<SearchFilterProps> = ({ value: defaultValue }) => {
  const router = useRouter();

  const onChangeSearch: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    const { [FilterCategories.Search]: searchValue, ...restQuery } =
      router.query;
    const query = restQuery;

    if (value.length > 0) {
      query[FilterCategories.Search] ??= value;
    }

    router.push({
      pathname: router.pathname,
      query,
    });
  };

  const debounceValue = debouce(onChangeSearch, 200);

  useEffect(() => {
    return () => {
      debounceValue.cancel();
    };
  });

  return (
    <input
      type='search'
      defaultValue={defaultValue}
      onChange={debounceValue}
      placeholder={texts.body.filterSearchPlaceholder}
    />
  );
};

export default SearchFilter;
