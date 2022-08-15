import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import PizzaList from '../components/PizzaList';
import Featured from '../components/Featured';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Shack in TO</title>
        <meta name="description" content="Best Pizza shop from the 6ix" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <PizzaList />
    </div>
  );
}
