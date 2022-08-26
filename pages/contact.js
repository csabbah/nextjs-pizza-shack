import React, { useState } from 'react';
import styles from '../styles/Contact.module.css';
const contact = () => {
  return (
    <div className={styles.container}>
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
        <input className={styles.input} type="text" placeholder="Email"></input>
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
        <button className={styles.button}>Send</button>
      </div>
    </div>
  );
};

export default contact;
