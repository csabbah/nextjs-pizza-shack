import Head from 'next/head';
import styles from '../styles/Home.module.css';
import PizzaList from '../components/PizzaList';
import Featured from '../components/Featured';
import axios from 'axios';
import { useState } from 'react';
import Add from '../components/Add';
import AddButton from '../components/AddButton';

export default function Home({ pizzaList, admin }) {
  const [close, setClose] = useState(true);
  const [activePizzas, setActivePizzas] = useState(pizzaList);

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Best Pizza shop from the 6ix" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {/* If logged in as admin, display the component */}
      {admin && <AddButton setClose={setClose} />}
      <PizzaList activePizzas={activePizzas} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.res.req.cookies.token || '';

  let admin = myCookie == process.env.TOKEN;

  const res = await axios.get('http://localhost:3000/api/products');
  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};
