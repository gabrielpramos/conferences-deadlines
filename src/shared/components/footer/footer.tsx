import ContactArticle from './components/contact-article';
import CopyRightArticle from './components/copyright-article';
import './footer.scss';

const Footer = () => (
  <footer className='footer'>
    <ContactArticle />

    <CopyRightArticle />
  </footer>
);

export default Footer;
