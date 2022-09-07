import React, { useState } from 'react';
import styles from '../styles/TrackOrder.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ImSearch } from 'react-icons/im';
import { FiSearch } from 'react-icons/fi';

const TrackOrder = () => {
  const [inputtedId, setInputtedId] = useState(null);
  const [error, setError] = useState([false, '']);
  const router = useRouter();

  // Redirect to /orders/ with the submitted id
  const handleSubmit = async () => {
    // If there is no inputted id, set error to true with a specific label
    if (inputtedId) {
      // Fetch the data to first check if it exists
      try {
        const res = await axios.get(
          `http://localhost:3000/api/orders/${inputtedId}`
        );

        if (res.data !== null && res.status == 200) {
          // If data exists, redirect to orders page with given id
          router.push(`/orders/${inputtedId}`);
        } else {
          return setError([true, 'No order found with that ID']);
        }
      } catch (err) {
        // Set error to true and display it
        return setError([true, 'No order found with that ID']);
      }
    } else {
      return setError([true, 'Field needs to be filled']);
    }
  };

  return (
    <>
      <Head>
        <title>Track Order</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Track Order</h1>
          <span className={styles.input}>
            <input
              id="input"
              style={{ border: error[0] ? '2px solid red' : '' }}
              onChange={(e) => {
                setError([false, '']);
                setInputtedId(e.target.value);
              }}
              className={styles.input}
              type="text"
              placeholder="Tracking ID"
            ></input>
            <FiSearch className={styles.icon} />
          </span>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => handleSubmit()}
            className={styles.button}
          >
            Check
          </button>
          {error[0] && (
            <p style={{ marginTop: '10px', color: '#fcedda' }}>{error[1]}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TrackOrder;
