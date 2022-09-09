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
        <meta
          name="viewport"
          content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=0;"
        />
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
