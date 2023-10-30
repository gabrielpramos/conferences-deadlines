import { GOOGLE_MAPS_URL } from '@/shared/constants/urls';
import { PiMapPinLineFill } from 'react-icons/pi';
import { FiExternalLink } from 'react-icons/fi';
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
      <Link
        href={{
          pathname: GOOGLE_MAPS_URL,
          query: { q: location },
        }}
        target='_blank'
      >
        <PiMapPinLineFill className='icon' />

        {location}

        <FiExternalLink className='icon' />
      </Link>
    </>
  );
};

export default ConferenceLocation;
