import texts from '@/shared/constants/texts';
import { AiTwotonePhone } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import ContactSocialMediaElements from './contact-social-media-elements';

const ContactInfo = () => (
  <>
    <p className='contact-info'>
      <AiTwotonePhone />

      <span>{texts.contactInfo.phoneNumber}</span>
    </p>

    <p className='contact-info'>
      <MdEmail className='align-middle' />

      <span>{texts.contactInfo.emailAddress}</span>
    </p>

    <ContactSocialMediaElements />
  </>
);

export default ContactInfo;
