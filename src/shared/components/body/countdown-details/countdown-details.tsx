import { ConferenceInfo } from '@/app/models/spreadsheet-model';
import { FC } from 'react';
import DeadlineDetail from './deadline-detail/deadline-detail';
import texts from '@/shared/constants/texts';
import Countdown from './countdown/countdown';
import { isValid } from 'date-fns';

type CountdownDetailsProps = {
  [keys in Uncapitalize<
    keyof Pick<ConferenceInfo, 'DeadlineISO' | 'Detail'>
  >]: ConferenceInfo[Capitalize<keys>];
};

const CountdownDetails: FC<CountdownDetailsProps> = ({
  deadlineISO,
  detail,
}) => {
  const endDate = new Date(deadlineISO);
  const submissionDeadlineOverdue =
    !isValid(endDate) || Date.now() > endDate.getTime();

  return (
    <aside className='countdown-details'>
      {submissionDeadlineOverdue ? (
        <p className='overdue-conference'>{texts.body.overdueSubmissionText}</p>
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
