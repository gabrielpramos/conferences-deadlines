import { GOOGLE_MAPS_URL } from '@/shared/constants/urls';
import { PiMapPinLineFill } from 'react-icons/pi';
import Link from 'next/link';
import { FC } from 'react';

interface ConferenceLocationProps {
  location: string;
}

const ConferenceLocation: FC<ConferenceLocationProps> = ({ location }) => {
  if (!location) {
    return location;
  }

  return (
    <>
      <PiMapPinLineFill className='icon' />

      <Link
        href={{
          pathname: GOOGLE_MAPS_URL,
          query: { q: location },
        }}
        target='_blank'
      >
        {location}
      </Link>
    </>
  );
};

export default ConferenceLocation;
