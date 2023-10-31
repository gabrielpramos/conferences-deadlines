import { FiltersGroup } from '@/app/models/filter-model';
import texts from '@/shared/constants/texts';
import { FC } from 'react';

interface PageFiltersProps {
  filtersGroup: FiltersGroup;
}

const PageFilters: FC<PageFiltersProps> = ({ filtersGroup }) => {
  const greatAreasList = Object.keys(filtersGroup);

  return (
    <aside className='filters'>
      <h3>{texts.body.filterTitle}</h3>

      <div>
        {greatAreasList.map((filterGroup) => (
          <details key={filterGroup}>
            <summary>{filterGroup}</summary>

            <input type='checkbox' id='scales' name='scales' checked />
            <label htmlFor='scales' >Scales</label>
          </details>
        ))}
      </div>
    </aside>
  );
};

export default PageFilters;
