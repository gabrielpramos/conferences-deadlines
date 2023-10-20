import Image from 'next/image';
import Link from 'next/link';
import { CESAR_SCHOOL_PATH, LOGO_PATH1 } from '../constants';
import texts from '@/shared/constants/texts';
import './header.scss';

const Header = () => (
  <header className='header'>
    <Link href={CESAR_SCHOOL_PATH} target='_blank'>
      <Image
        width={100}
        height={79}
        src={LOGO_PATH1}
        alt={texts.header.logoAltText}
      />
    </Link>

    <h2>Conferences Deadlines</h2>
  </header>
);

export default Header;
