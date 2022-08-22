import React, { useState } from 'react';
import styles from '../../styles/Admin.module.css';
import Image from 'next/image';
import axios from 'axios';

const Index = ({ orders, products }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(products);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/products/${id}`
      );

      // Normally, when we delete something from the database, it doesn't show right away
      // So, we update the pizzaList useState object which reflects realtime changes
      setPizzaList(pizzaList.filter((product) => product._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  console.log(products);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => {
            return (
              <tbody>
                <tr key={product._id} className={styles.trTitle}>
                  <td>
                    <Image
                      src={product.img}
                      width={50}
                      height={50}
                      objectFit="cover"
                      alt=""
                    />
                  </td>
                  <td>{product._id.slice(0, 5)}...</td>
                  <td>Pizza Title</td>
                  <td>${product.prices[0]}</td>
                  <td>
                    <button className={styles.button}>Edit</button>
                    <button
                      className={styles.button}
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          <tbody>
            <tr className={styles.trTitle}>
              <td>{'2315353285923151'.slice(0, 5)}...</td>
              <td>John Doe</td>
              <td>$50</td>
              <td>paid</td>
              <td>preparing</td>
              <td>
                <button className={styles.nextStageBtn}>Next Stage</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;

// Fetch all the active products and Orders via admin dashboard
export const getServerSideProps = async () => {
  const products = await axios.get(`http://localhost:3000/api/products`);
  const orders = await axios.get(`http://localhost:3000/api/orders`);

  return {
    props: {
      orders: orders.data,
      products: products.data,
    },
  };
};
