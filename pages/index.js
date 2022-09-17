import Head from 'next/head';
import PizzaList from '../components/PizzaList';
import Featured from '../components/Featured';
import axios from 'axios';
import { useState } from 'react';
import { server } from '../utils/config.js';
import { IoIosSend } from 'react-icons/io';
import styles from '../styles/Contact.module.css';

export default function Home({ pizzaList, masterStore }) {
  const [activePizzas, setActivePizzas] = useState(pizzaList);

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Best Pizza shop from the 6ix" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=0;"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {masterStore.length > 0 ? (
        <Featured masterStore={masterStore} />
      ) : (
        <div style={{ paddingTop: '100px' }}></div>
      )}
      <PizzaList activePizzas={activePizzas} />
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.wrapper}>
            <h1>We&apos;d love to hear from you!</h1>
            <div className={styles.innerWrapper}>
              <p className={styles.email}>support@pizzashack.com</p>
              <p className={styles.phone}>(602) 867-1012</p>
            </div>
            <p className={styles.address}>
              1614 E. Erwin St #104. <br></br> NewYork, 85022
            </p>
          </div>
          <div className={styles.wrapper}>
            <input
              className={styles.input}
              type="text"
              placeholder="Full Name"
            ></input>
            <input
              className={styles.input}
              type="text"
              placeholder="Email"
            ></input>
            <input
              className={styles.input}
              type="text"
              placeholder="Phone Number"
            ></input>
            <textarea
              className={styles.textarea}
              type="text"
              placeholder="Message"
            ></textarea>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
              className={styles.button}
            >
              Send
              <IoIosSend
                style={{
                  display: 'flex',
                  marginRight: '2px',
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const products = await axios.get(`${server}/api/products`);
  const store = await axios.get(`${server}/api/store`);

  return {
    props: {
      masterStore: store.data,
      pizzaList: products.data,
    },
  };
};
