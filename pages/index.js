import Head from 'next/head';
import styles from '../styles/Home.module.css';
import PizzaList from '../components/PizzaList';
import Featured from '../components/Featured';
import axios from 'axios';
import { useState } from 'react';
import { server } from '../utils/config.js';

export default function Home({ pizzaList }) {
  const [activePizzas, setActivePizzas] = useState(pizzaList);

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Best Pizza shop from the 6ix" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <PizzaList activePizzas={activePizzas} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get(`${server}/api/products`);
  return {
    props: {
      pizzaList: res.data,
    },
  };
};
