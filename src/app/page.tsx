import Header from '@/shared/components/header/header';
import styles from './page.module.css';
import Footer from '@/shared/components/footer/footer';
import Body from '@/shared/components/body/body';

const Home = () => (
  <main className={styles.main}>
    <Header />

    <Body />

    <Footer />
  </main>
);

export default Home;
