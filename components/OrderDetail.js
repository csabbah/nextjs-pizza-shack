import React, { useState } from 'react';
import styles from '../styles/orderDetail.module.css';

const OrderDetail = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState('');
  const [address, setAddress] = useState('');

  const handleClick = () => {
    // Method 0 = Cash
    createOrder({ customer, address, total, method: 0 });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>You will pay $12 after delivery</h1>
        <div className={styles.item}>
          <label className={styles.label}>Name Surname:</label>
          <input
            placeholder="John Doe"
            type="text"
            className={styles.input}
            onChange={(e) => {
              setCustomer(e.target.value);
            }}
          ></input>
          <label className={styles.label}>Phone Number:</label>
          <input
            type="number"
            placeholder="+1 423 322 2422"
            className={styles.input}
          ></input>
          <label className={styles.label}>Address:</label>
          <textarea
            rows={5}
            placeholder="Elton st. 13 NY"
            type="text"
            className={styles.textarea}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          ></textarea>
        </div>
        <button className={styles.button} onClick={handleClick}>
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
