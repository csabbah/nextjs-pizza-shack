import React, { useState } from 'react';
import styles from '../styles/PizzaList.module.css';
import PizzaCard from './PizzaCard';

const PizzaList = ({ activePizzas }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN!</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim deserunt
        cum eveniet iure repellendus perferendis cupiditate sit, quis quisquam
        at.
      </p>
      <div className={styles.wrapper}>
        {activePizzas.length == 0
          ? 'No Available Pizzas'
          : activePizzas.map((pizza) => {
              return <PizzaCard pizza={pizza} key={pizza._id} />;
            })}
      </div>
    </div>
  );
};

export default PizzaList;
