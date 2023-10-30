import { ConferenceInfo } from '@/app/models/spreadsheet-model';
import { FC } from 'react';
import Countdown from './countdown/countdown';
import DeadlineDetail from './deadline-detail/deadline-detail';
import { intervalToDuration } from 'date-fns';

type CountdownDetailsProps = {
  [keys in Uncapitalize<
    keyof Pick<ConferenceInfo, 'DeadlineISO' | 'Detail'>
  >]: ConferenceInfo[Capitalize<keys>];
};

const CountdownDetails: FC<CountdownDetailsProps> = ({
  deadlineISO,
  detail,
}) => {
  const submissionDeadlineOverdue =
    !deadlineISO || Date.now() > Number(deadlineISO);
  const endDate = Number(deadlineISO);

  return (
    <aside className='countdown-details'>
      {submissionDeadlineOverdue ? (
        <p className='overdue-conference'>
          The submission deadline has passed or has not been shared.
        </p>
      ) : (
        <Countdown endDate={endDate} />
      )}

      <DeadlineDetail
        detail={detail}
        endDate={endDate}
        submissionDeadlineOverdue={submissionDeadlineOverdue}
      />
    </aside>
  );
};

export default CountdownDetails;
