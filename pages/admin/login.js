import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../../styles/Login.module.css';
import Head from 'next/head';

import { server } from '../../utils/config.js';

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const [error, setError] = useState([false, '']);

  const router = useRouter();

  const handleClick = async () => {
    if (!username || !password) {
      return setError([true, 'Please fill in all fields']);
    }
    try {
      await axios.post(`${server}/api/login`, {
        username,
        password,
      });
      router.push('/admin');
    } catch (err) {
      setError([true, 'Incorrect Credentials']);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <input
            placeholder="username"
            className={styles.input}
            style={{ border: error[0] ? '2px solid red' : '' }}
            onChange={(e) => {
              setError([false, '']);
              setUsername(e.target.value);
            }}
          />
          <input
            placeholder="password"
            type="password"
            className={styles.input}
            style={{ border: error[0] ? '2px solid red' : '' }}
            onChange={(e) => {
              setError([false, '']);
              setPassword(e.target.value);
            }}
          />
          <button onClick={handleClick} className={styles.button}>
            Sign In
          </button>
          {error[0] && (
            <p
              style={{ color: '#fcedda', marginTop: '10px', marginBottom: '0' }}
            >
              {error[1]}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
