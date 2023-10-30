'use client';

import { intervalToDuration } from 'date-fns';
import { FC, useEffect, useState } from 'react';

interface CountdownProps {
  endDate: number;
}

const Countdown: FC<CountdownProps> = ({ endDate }) => {
  const [counter, setCounter] = useState(endDate);
  const interval = intervalToDuration({
    start: new Date(),
    end: new Date(endDate),
  });

  const treatedInterval = Object.entries(interval).reduce(
    (acc, [key, value]) => {
      const result = value > 0 ? `${key}: ${value}` : '';

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

  return window ? <p>{treatedInterval}</p> : <></>;
};

export default Countdown;
