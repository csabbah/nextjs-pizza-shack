import React from 'react';
import styles from '../styles/PizzaList.module.css';
import PizzaCard from './PizzaCard';

const PizzaList = ({ pizzaList }) => {
  console.log(pizzaList);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN!</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim deserunt
        cum eveniet iure repellendus perferendis cupiditate sit, quis quisquam
        at.
      </p>
      <div className={styles.wrapper}>
        {pizzaList.length == 0
          ? 'No Available Pizzas'
          : pizzaList.map((pizza) => {
              return <PizzaCard pizza={pizza} key={pizza._id} />;
            })}
      </div>
    </div>
  );
};

export default PizzaList;
