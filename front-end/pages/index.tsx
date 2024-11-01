import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/headers';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Event Manager</title>
        <meta name="description" content="Your go-to platform for managing events seamlessly." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main >
        <section >
          <h1> Welcome to Event Manager</h1>
          <p>
            Your gateway to organizing and attending unforgettable events.
          </p>
        </section>
      </main>
    </>
  );
};

export default Home;
