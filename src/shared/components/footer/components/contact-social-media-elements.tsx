import Link from 'next/link';
import { SOCIAL_MEDIA_PATHS } from '../../../constants/urls';
import { BsFacebook, BsTwitter, BsInstagram, BsYoutube } from 'react-icons/bs';
import texts from '@/shared/constants/texts';

const ContactSocialMediaElements = () => (
  <p className='contact-info link-icon'>
    <Link
      href={SOCIAL_MEDIA_PATHS.facebook}
      target='_blank'
      title={texts.contactInfo.socialMediaElements.facebookTitle}
    >
      <BsFacebook />
    </Link>

    <Link
      href={SOCIAL_MEDIA_PATHS.twitter}
      target='_blank'
      title={texts.contactInfo.socialMediaElements.twitterTitle}
    >
      <BsTwitter />
    </Link>

    <Link
      href={SOCIAL_MEDIA_PATHS.instagram}
      target='_blank'
      title={texts.contactInfo.socialMediaElements.instagramTitle}
    >
      <BsInstagram />
    </Link>

    <Link
      href={SOCIAL_MEDIA_PATHS.youtube}
      target='_blank'
      title={texts.contactInfo.socialMediaElements.youtubeTitle}
    >
      <BsYoutube />
    </Link>
  </p>
);

export default ContactSocialMediaElements;
