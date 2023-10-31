'use client';

import { GLOBAL_OBJECT_TO_STRING_SERVER } from '@/shared/constants/texts';
import { intervalToDuration } from 'date-fns';
import { FC, useEffect, useState } from 'react';

interface CountdownProps {
  endDate: number;
}

const Countdown: FC<CountdownProps> = ({ endDate }) => {
  const endInterval = new Date(endDate);
  const [counter, setCounter] = useState(endDate);
  const interval = intervalToDuration({
    start: new Date(),
    end: endInterval,
  });

  const treatedInterval = Object.entries(interval).reduce(
    (acc, [key, value]) => {
      const result = value > 0 ? `${value} ${key}` : `${acc ? `1 ${key}` : ''}`;

      return `${acc ? `${acc}, ` : ''}${result}`;
    },
    ''
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1000);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [counter]);

  return (
    <p className='countdown-text'>
      <time dateTime={endInterval.toISOString()} suppressHydrationWarning>
        {treatedInterval}
      </time>
    </p>
  );
};

export default Countdown;
