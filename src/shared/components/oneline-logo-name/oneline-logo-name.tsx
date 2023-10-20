import Link from 'next/link';
import Image from 'next/image';
import { CESAR_SCHOOL_PATH, LOGO_PATH2 } from '../constants';
import texts from '@/shared/constants/texts';

const OnelineLogoName = () => (
  <Link href={CESAR_SCHOOL_PATH} target='_blank'>
    <Image width={174} height={28} src={LOGO_PATH2} alt={texts.onelineLogoNameAltText} />
  </Link>
);

export default OnelineLogoName;
