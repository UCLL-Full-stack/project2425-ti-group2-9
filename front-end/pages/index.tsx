import Head from 'next/head';
import Image from 'next/image';
import styles from '@styles/home.module.css';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Event Manager</title>
        <meta name="description" content="Your go-to platform for managing events seamlessly." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Welcome to Event Manager</h1>
          <p className={styles.tagline}>
            Your gateway to organizing and attending unforgettable events.
          </p>
        </section>
      </main>
    </>
  );
};

export default Home;
