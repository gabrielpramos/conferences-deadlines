'use client';

import { Duration, intervalToDuration } from 'date-fns';
import { FC } from 'react';
import { DisplayOptionType, displayOptions } from './constants';
import { CountdownDisplayOptions } from '@/app/models/countdown-model';
import CountdownClock from './countdown-clock/countdown-clock';

interface CountdownProps {
  endDate: number;
}

const PASSED_INTERVAL = 0;
const NEAR_INTERVAL = 1;
const WEEK_INTERVAL = 7;
const CRITICAL_DAYS_INTERVAL = 2;

const Countdown: FC<CountdownProps> = ({ endDate }) => {
  const endInterval = new Date(endDate);
  const interval = intervalToDuration({
    start: new Date(),
    end: endInterval,
  }) as Required<Duration>;
  const displayDefinitions = { definitions: {} };
  const noYears = interval.years === PASSED_INTERVAL;
  const noMonths = interval.months === PASSED_INTERVAL;

  if (interval.years > PASSED_INTERVAL) {
    displayDefinitions.definitions =
      displayOptions[CountdownDisplayOptions.LongRange];
  } else if (noYears && interval.months > NEAR_INTERVAL) {
    displayDefinitions.definitions =
      displayOptions[CountdownDisplayOptions.MediumRange];
  } else if (noYears && interval.months <= NEAR_INTERVAL) {
    displayDefinitions.definitions =
      displayOptions[CountdownDisplayOptions.MediumShortRange];
  } else if (noYears && noMonths && interval.days <= WEEK_INTERVAL) {
    displayDefinitions.definitions =
      displayOptions[CountdownDisplayOptions.ShortRange];
  } else if (noYears && noMonths && interval.days <= CRITICAL_DAYS_INTERVAL) {
    displayDefinitions.definitions =
      displayOptions[CountdownDisplayOptions.CriticalRange];
  }

  const treatedInterval = Object.entries(interval)
    .filter(
      ([key, value]) =>
        (displayDefinitions.definitions as DisplayOptionType).displayKeys.some(
          (displayKey) => displayKey === key
        ) && value > 0
    )
    .map(([key, value]) => `${value} ${key}`)
    .join(', ');

  return (
    <>
      {(displayDefinitions.definitions as DisplayOptionType).countdown ? (
        <CountdownClock endDate={endDate} treatedInterval={treatedInterval} />
      ) : (
        <p className='countdown-text' suppressHydrationWarning>
          {treatedInterval}
        </p>
      )}
    </>
  );
};

export default Countdown;
