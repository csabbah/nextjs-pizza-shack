import React, { useState } from 'react';
import styles from '../styles/orderDetail.module.css';

const OrderDetail = ({ total, createOrder, setCash, setOpen }) => {
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

  const clickOutside = (e) => {
    if (e == 'orderDetail_container__rUVxb') {
      setCash(false);
    }
  };

  return (
    <div
      onClick={(e) => clickOutside(e.target.className)}
      className={styles.container}
    >
      <div className={styles.wrapper}>
        <span onClick={() => setCash(false)} className={styles.closeBtn}>
          X
        </span>
        <h1 className={styles.title}>You will pay ${total} after delivery</h1>
        <div className={styles.item}>
          <label className={styles.label}>Name Surname:</label>
          <input
            placeholder="John Doe"
            style={{ border: error[0] ? '1px solid red' : '' }}
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
            style={{ border: error[0] ? '1px solid red' : '' }}
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
            style={{ border: error[0] ? '1px solid red' : '' }}
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
        {error[0] && (
          <p style={{ color: '#fcedda', marginTop: '10px', marginBottom: '0' }}>
            {error[1]}
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
