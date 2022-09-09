import React, { useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import Head from 'next/head';
import styles from '../styles/Contact.module.css';
const contact = () => {
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=0;"
        />
      </Head>
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
    </>
  );
};

export default contact;
