import React from 'react';
import styles from '../styles/PizzaCard.module.css';
import Image from 'next/image';

const PizzaCard = ({ pizza }) => {
  return (
    <div className={styles.container}>
      <Image src={pizza.img} alt="Pizza picture" width="500" height="500" />
      <h1 className={styles.title}>{pizza.title}</h1>
      <span className={styles.price}>{pizza.prices[0]}</span>
      <p className={styles.desc}>{pizza.desc}</p>
    </div>
  );
};

export default PizzaCard;
