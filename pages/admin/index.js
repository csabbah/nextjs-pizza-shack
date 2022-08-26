import React, { useState } from 'react';
import styles from '../../styles/Admin.module.css';
import Image from 'next/image';
import axios from 'axios';
import Head from 'next/head';

import Add from '../../components/Add';
import AddButton from '../../components/AddButton';

const Index = ({ orders, products, admin }) => {
  const [close, setClose] = useState(true);

  // IMPORTANT TO NOTE, handleDelete() and handleNext() ALLOW US TO UPDATE THE DATA REALTIME (DOM)
  // handleDelete() SHOWS US HOW TO DELETE AND REFLECT THAT REALTIME
  // handleNext9) SHOWS US HOW TO UPDATE A DATA IIN THE MODEL AND REFLECT IT REAL TIME

  // By assigning state objects to contain our database data, we can update them to
  // have the virtual DOM reflect the real time changes
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);

  const status = ['Preparing', 'On the way', 'Delivered'];

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

  const handleNext = async (id, order) => {
    // If order.status is 2, that means it's delivered so don't increment further
    if (order.status == 2) {
    } else {
      // Extract the current status from the order
      const currentStatus = order.status;
      try {
        const res = await axios.put(`http://localhost:3000/api/orders/${id}`, {
          // Increment the Current status by 1
          status: currentStatus + 1,
        });
        // Return updated order
        setOrderList([
          // Push the the updated data
          res.data,
          // Keep the existing data but delete the previous version of the order we just modified
          ...orderList.filter((order) => order._id !== id),
        ]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      {/* If logged in as admin, display the component */}
      {admin && <AddButton setClose={setClose} />}
      {!close && <Add setClose={setClose} />}
      <div className={styles.container}>
        <div className={styles.item}>
          <h1 className={styles.title}>Products</h1>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Image</th>
                <th>Id</th>
                <th>Title</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            {pizzaList.map((product) => {
              return (
                <tbody className={styles.tbody} key={product._id}>
                  <tr className={styles.trTitle}>
                    <td className={styles.td}>
                      <Image
                        src={product.img}
                        width={50}
                        height={50}
                        objectFit="cover"
                        alt=""
                      />
                    </td>
                    <td className={styles.td}>{product._id.slice(0, 5)}...</td>
                    <td className={styles.td}>{product.title}</td>
                    <td className={styles.td}>${product.prices[0]}</td>
                    <td className={styles.td}>
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
            <thead>
              <tr className={styles.trTitle}>
                <th>Id</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {orderList.map((order) => {
              return (
                <tbody
                  key={order._id}
                  style={{ opacity: order.status == 2 ? '0.4' : '' }}
                >
                  <tr className={styles.trTitle}>
                    <td className={styles.td}>{order._id.slice(0, 5)}...</td>
                    <td className={styles.td}>{order.customer}</td>
                    <td className={styles.td}>${order.total}</td>
                    <td className={styles.td}>
                      {order.method == 1 ? 'PayPal' : 'Cash'}
                    </td>
                    <td className={styles.td}>{status[order.status]}</td>
                    <td className={styles.td}>
                      <button
                        // Disable button if order status is 2 (2 == delivered)
                        style={{
                          pointerEvents: order.status == 2 ? 'none' : 'all',
                        }}
                        className={styles.nextStageBtn}
                        onClick={() => handleNext(order._id, order)}
                      >
                        Next Stage
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};

export default Index;

// Fetch all the active products and Orders via admin dashboard
export const getServerSideProps = async (ctx) => {
  // If there is a request, we are going to take the cookie, else, make it an empty string
  const myCookie = ctx.res.req.cookies.token || '';

  let admin = myCookie == process.env.TOKEN;
  // If token is not valid, redirect to login
  if (myCookie !== process.env.TOKEN) {
    return {
      // This is a next.js function to redirect to a different page
      redirect: {
        destination: '/admin/login',
        // Setting to false will keep users on the same tab
        permanent: false,
      },
    };
  }

  const products = await axios.get(`http://localhost:3000/api/products`);
  const orders = await axios.get(`http://localhost:3000/api/orders`);

  return {
    props: {
      orders: orders.data,
      products: products.data,
      admin,
    },
  };
};
