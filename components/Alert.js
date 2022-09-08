import React from 'react';
import styles from '../styles/Alert.module.css';
const Alert = () => {
  return (
    <div className={`alert alert-warning ${styles.container}`} role="alert">
      This is a info alert—check it out!
    </div>
  );
};

export default Alert;
