import { ConferenceInfo } from '@/app/models/spreadsheet-model';
import { FC } from 'react';
import Countdown from './countdown/countdown';

type CountdownDetailsProps = {
  [keys in Uncapitalize<
    keyof Pick<ConferenceInfo, 'Deadline' | 'DeadlineTimeZone' | 'DeadlineISO'>
  >]: ConferenceInfo[Capitalize<keys>];
};

const CountdownDetails: FC<CountdownDetailsProps> = ({ deadlineISO }) => {
  if (!deadlineISO) {
    return <p>The submission deadline has passed or has not been shared.</p>;
  }

  const [year, month, day, hour, minute, second] = deadlineISO
    .replaceAll(/[Date()]/g, '')
    .split(',')
    .map(Number);

  const treatedDate = new Date(
    year,
    month,
    day,
    hour,
    minute,
    second
  ).getTime();

  return <Countdown endDate={treatedDate} />;
};

export default CountdownDetails;
