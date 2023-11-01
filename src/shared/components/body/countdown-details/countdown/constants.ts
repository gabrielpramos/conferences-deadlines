import {
  CountdownDisplayOptions,
  IntervalElements,
} from '@/app/models/countdown-model';

export type DisplayOptionType = {
  displayKeys: IntervalElements[];
  countdown: boolean;
};

export type DisplayOptionsType = {
  [key in keyof typeof CountdownDisplayOptions]: DisplayOptionType;
};

/* LongRange        :::    interval.years > 0 show=years, months, and days countdown=no countdown
   MediumRange      :::    interval.years===0 && interval.months>1 show=months, and days countdown=no countdown
   MediumShortRange :::    interval.years ===0 && interval.months <= 1 && interaval.days>7 show = weeks, months, days
   ShortRange       :::    interval.years ===0 && interval.months===0 && interval.days<=7 show=days, hours, minutes
   CriticalRange    :::    interval.years ===0 && interval.months===0 && interval.days<=2 show=days, hours, minutes, seconds
*/

export const displayOptions: DisplayOptionsType = {
  [CountdownDisplayOptions.LongRange]: {
    displayKeys: [
      IntervalElements.Years,
      IntervalElements.Months,
      IntervalElements.Days,
    ],
    countdown: false,
  },
  [CountdownDisplayOptions.MediumRange]: {
    displayKeys: [IntervalElements.Months, IntervalElements.Days],
    countdown: false,
  },
  [CountdownDisplayOptions.MediumShortRange]: {
    displayKeys: [
      IntervalElements.Months,
      IntervalElements.Days,
    ],
    countdown: false,
  },
  [CountdownDisplayOptions.ShortRange]: {
    displayKeys: [
      IntervalElements.Days,
      IntervalElements.Hours,
      IntervalElements.Minutes,
    ],
    countdown: false,
  },
  [CountdownDisplayOptions.CriticalRange]: {
    displayKeys: [
      IntervalElements.Days,
      IntervalElements.Hours,
      IntervalElements.Minutes,
      IntervalElements.Seconds,
    ],
    countdown: true,
  },
};
