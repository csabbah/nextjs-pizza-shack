import React, { useState } from 'react';
import styles from '../styles/orderDetail.module.css';

const OrderDetail = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const [error, setError] = useState([false, '']);

  const handleClick = () => {
    if (customer && address && phone) {
      if (phone.length < 9) {
        setError([true, 'Please type a valid phone']);
      } else {
        // Method 0 = Cash (We set this valuation)
        createOrder({ customer, address, total, method: 0 });
      }
    } else {
      setError([true, 'Please fill in all fields']);
    }
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
              setError([false, '']);
            }}
          ></input>
          <label className={styles.label}>Phone Number:</label>
          <input
            type="number"
            onChange={(e) => {
              setPhone(e.target.value);
              setError([false, '']);
            }}
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
              setError([false, '']);
            }}
          ></textarea>
        </div>
        <button className={styles.button} onClick={handleClick}>
          Order
        </button>
        {error[0] && <p style={{ color: 'red' }}>{error[1]}</p>}
      </div>
    </div>
  );
};

export default OrderDetail;
