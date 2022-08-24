import React, { useState } from 'react';
import styles from '../styles/TrackOrder.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
const TrackOrder = () => {
  const [inputtedId, setInputtedId] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  // Redirect to /orders/ with the submitted id
  const handleSubmit = async () => {
    // Fetch the data to first check if it exists
    try {
      const res = await axios.get(
        `http://localhost:3000/api/orders/${inputtedId}`
      );

      if (res.status == 200) {
        // If data exists, redirect to orders page with given id
        router.push(`/orders/${inputtedId}`);
      }
    } catch (err) {
      // Set error to true and display it
      setError(true);
    }
  };

  const handleChange = (e) => {
    setError(false);
    setInputtedId(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Track Order</h1>
        <input
          onChange={(e) => handleChange(e)}
          className={styles.input}
          type="text"
          placeholder="Tracking ID"
        ></input>
        <button onClick={() => handleSubmit()} className={styles.button}>
          Submit
        </button>
        {error && <p style={{ color: 'red' }}>No order found with that ID</p>}
      </div>
    </div>
  );
};

export default TrackOrder;
