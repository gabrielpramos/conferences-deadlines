import { intervalToDuration } from 'date-fns';
import { FC } from 'react';

interface DeadlineDetailProps {
  detail: string;
  endDate: number;
  submissionDeadlineOverdue: boolean;
}

const CRITICAL_VALUE = 2;
const NOT_CRITICAL_VALUE = 7;
const DEADLINE_VALUE = 0;

enum DeadlineTargetLabels {
  OnTarget = 'on-target',
  OnTargetWarning = 'on-target-warning',
  CriticalCloseToDeadline = 'critical-close-to-deadline',
}

const DeadlineDetail: FC<DeadlineDetailProps> = ({
  detail,
  endDate,
  submissionDeadlineOverdue,
}) => {
  if (submissionDeadlineOverdue) {
    return (
      <p className={`detail ${DeadlineTargetLabels.CriticalCloseToDeadline}`}>
        {detail}
      </p>
    );
  }

  const { years, months } = intervalToDuration({
    start: new Date(),
    end: new Date(endDate),
  });

  const criticityCheck = (years: number = 0, months: number = 0) => {
    const farAwayDeadline = years > DEADLINE_VALUE;
    const notFarButOnTargetDeadline =
      years === DEADLINE_VALUE && months >= NOT_CRITICAL_VALUE;
    const onTargetButCloseDeadline =
      months < NOT_CRITICAL_VALUE && months > CRITICAL_VALUE;
    const criticalCloseToDeadline = months <= CRITICAL_VALUE;

    if (farAwayDeadline || notFarButOnTargetDeadline) {
      return DeadlineTargetLabels.OnTarget;
    } else if (onTargetButCloseDeadline) {
      return DeadlineTargetLabels.OnTargetWarning;
    } else if (criticalCloseToDeadline) {
      return DeadlineTargetLabels.CriticalCloseToDeadline;
    }
  };

  return <p className={`detail ${criticityCheck(years, months)}`}>{detail}</p>;
};

export default DeadlineDetail;
