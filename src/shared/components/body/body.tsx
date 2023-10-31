import './body.scss';
import Conferences from './conference-list/conference-list';
import PageFilters from './page-filters/page-filters';
import { FC } from 'react';
import { HomePageProps } from '../../../../pages';

type BodyProps = HomePageProps;

const Body: FC<BodyProps> = ({ conferences, filters }) => {
  return (
    <div className='page-body'>
      <PageFilters filtersGroup={filters.filterTypes} filters={filters} />

      <section className='conference-list'>
        <Conferences conferences={conferences} />
      </section>
    </div>
  );
};

export default Body;
