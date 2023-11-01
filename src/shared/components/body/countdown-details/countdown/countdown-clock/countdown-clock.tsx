'use client';

import { FC, useEffect, useState } from 'react';

interface CountdownClockProps {
  endDate: number;
  treatedInterval: string;
}

const CountdownClock: FC<CountdownClockProps> = ({
  endDate,
  treatedInterval,
}) => {
  const [counter, setCounter] = useState(endDate);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1000);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [counter]);

  return treatedInterval;
};

export default CountdownClock;
