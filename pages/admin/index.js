import React, { useState, useEffect } from 'react';
import styles from '../../styles/Admin.module.css';
import Image from 'next/image';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

import Add from '../../components/Add';

import { useRouter } from 'next/router';

const Index = ({ orders, products }) => {
  const router = useRouter();
  const [close, setClose] = useState(true);

  // IMPORTANT TO NOTE, handleDelete() and handleNext() ALLOW US TO UPDATE THE DATA REALTIME (DOM)
  // handleDelete() SHOWS US HOW TO DELETE AND REFLECT THAT REALTIME
  // handleNext9) SHOWS US HOW TO UPDATE A DATA IIN THE MODEL AND REFLECT IT REAL TIME

  // By assigning state objects to contain our database data, we can update them to
  // have the virtual DOM reflect the real time changes
  const [pizzaList, setPizzaList] = useState(
    // When you assign the data to the useState object, initially, sort it so it shows the most recent data
    products.sort(function (a, b) {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    })
  );
  const [orderList, setOrderList] = useState(
    // Upon first assigning data to the use state object, sort the orders based on order status
    orders.sort(function (a, b) {
      return a.status - b.status;
    })
  );

  const status = ['Preparing', 'On the way', 'Delivered', 'Completed'];

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

  const handleOrderDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/orders/${id}`);

      setOrderList(orderList.filter((order) => order._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleNext = async (id, order) => {
    // If order.status is 2, that means it's delivered so don't increment further
    if (order.status == 3) {
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

  const logout = async () => {
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
    router.reload(window.location.pathname);
  };

  const [sorted, setSorted] = useState(true);
  const handleSort = (e, name) => {
    if (name == 'productsId') {
      var newList = [...pizzaList].sort((a, b) =>
        sorted ? (a._id > b._id ? 1 : -1) : a._id < b._id ? 1 : -1
      );
      setSorted(!sorted);
      setPizzaList(newList);
    }

    if (e == 'Title') {
      var newList = [...pizzaList].sort((a, b) =>
        sorted ? (a.title > b.title ? 1 : -1) : a.title < b.title ? 1 : -1
      );
      setSorted(!sorted);
      setPizzaList(newList);
    }

    if (e == 'Price') {
      var newList = [...pizzaList].sort((a, b) =>
        sorted ? (a.price > b.price ? 1 : -1) : a.price < b.price ? 1 : -1
      );
      setSorted(!sorted);
      setPizzaList(newList);
    }

    if (name == 'ordersId') {
      var newList = [...orderList].sort((a, b) =>
        sorted ? (a._id > b._id ? 1 : -1) : a._id < b._id ? 1 : -1
      );
      setSorted(!sorted);
      setOrderList(newList);
    }

    if (e == 'Customer') {
      var newList = [...orderList].sort((a, b) =>
        sorted
          ? a.customer > b.customer
            ? 1
            : -1
          : a.customer < b.customer
          ? 1
          : -1
      );
      setSorted(!sorted);
      setOrderList(newList);
    }
    if (e == 'Total') {
      var newList = [...orderList].sort((a, b) =>
        sorted ? (a.total > b.total ? 1 : -1) : a.total < b.total ? 1 : -1
      );
      setSorted(!sorted);
      setOrderList(newList);
    }
    if (e == 'Payment') {
      var newList = [...orderList].sort((a, b) =>
        sorted ? (a.method > b.method ? 1 : -1) : a.method < b.method ? 1 : -1
      );
      setSorted(!sorted);
      setOrderList(newList);
    }
    if (e == 'Status') {
      var newList = [...orderList].sort((a, b) =>
        sorted ? (a.status > b.status ? 1 : -1) : a.status < b.status ? 1 : -1
      );
      setSorted(!sorted);
      setOrderList(newList);
    }
  };

  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <button onClick={() => setClose(false)} className={styles.addBtn}>
        Add new Pizza
      </button>
      <button onClick={() => logout()} className={styles.logout}>
        Logout
      </button>
      {!close && (
        <Add
          setClose={setClose}
          pizzaList={pizzaList}
          setPizzaList={setPizzaList}
        />
      )}

      <div className={styles.container}>
        <div className={styles.item}>
          <div className={styles.itemWrapper}>
            <h1 className={styles.title}>Products</h1>
            <input type="text" placeholder="Search"></input>
          </div>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Image</th>
                <th>
                  <span
                    name="productsId"
                    onClick={(e) =>
                      handleSort(
                        e.target.innerText,
                        e.target.getAttribute('name')
                      )
                    }
                  >
                    Id
                  </span>
                </th>
                <th>
                  <span onClick={(e) => handleSort(e.target.innerText)}>
                    Title
                  </span>
                </th>
                <th>
                  <span onClick={(e) => handleSort(e.target.innerText)}>
                    Price
                  </span>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            {pizzaList.length == 0 || pizzaList == undefined ? (
              <tbody>
                <td>#</td>
                <td>No Data</td>
                <td>No Data</td>
                <td>No Data</td>
                <td>No Data</td>
              </tbody>
            ) : (
              pizzaList.map((product) => {
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
                      <td className={styles.td}>
                        {product._id.slice(0, 5)}...
                      </td>
                      <td className={styles.td}>{product.title}</td>
                      <td className={styles.td}>${product.prices[0]}</td>
                      <td className={styles.td}>
                        <span>
                          <button
                            className={`${styles.deleteBtn} ${styles.button}`}
                            onClick={() => handleDelete(product._id)}
                          >
                            Delete
                          </button>
                          <Link href={`/product/${product._id}`} passHref>
                            <button className={`${styles.button}`}>view</button>
                          </Link>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                );
              })
            )}
          </table>
        </div>
        <div className={styles.item}>
          <div className={styles.itemWrapper}>
            <h1 className={styles.title}>Orders</h1>
            <input type="text" placeholder="Search"></input>
          </div>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>
                  <span
                    name="ordersId"
                    onClick={(e) =>
                      handleSort(
                        e.target.innerText,
                        e.target.getAttribute('name')
                      )
                    }
                  >
                    Id
                  </span>
                </th>
                <th>
                  <span onClick={(e) => handleSort(e.target.innerText)}>
                    Customer
                  </span>
                </th>
                <th>
                  <span onClick={(e) => handleSort(e.target.innerText)}>
                    Total
                  </span>
                </th>
                <th>
                  <span onClick={(e) => handleSort(e.target.innerText)}>
                    Payment
                  </span>
                </th>
                <th>
                  <span onClick={(e) => handleSort(e.target.innerText)}>
                    Status
                  </span>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            {orderList == undefined || orderList.length == 0 ? (
              <tbody>
                <td>#</td>
                <td>No Data</td>
                <td>No Data</td>
                <td>No Data</td>
                <td>No Data</td>
              </tbody>
            ) : (
              orderList.map((order) => {
                return (
                  <tbody key={order._id}>
                    <tr className={styles.trTitle}>
                      <td
                        style={{ opacity: order.status == 3 ? '0.4' : '' }}
                        className={styles.td}
                      >
                        {order._id.slice(0, 5)}...
                      </td>
                      <td
                        style={{ opacity: order.status == 3 ? '0.4' : '' }}
                        className={styles.td}
                      >
                        {order.customer}
                      </td>
                      <td
                        style={{ opacity: order.status == 3 ? '0.4' : '' }}
                        className={styles.td}
                      >
                        ${order.total}
                      </td>
                      <td
                        style={{ opacity: order.status == 3 ? '0.4' : '' }}
                        className={styles.td}
                      >
                        {order.method == 1 ? 'PayPal' : 'Cash'}
                      </td>
                      <td
                        style={{ opacity: order.status == 3 ? '0.4' : '' }}
                        className={styles.td}
                      >
                        {status[order.status]}
                      </td>
                      <td className={styles.td}>
                        <button
                          // Disable button if order status is 3 (2 == delivered)
                          style={{
                            pointerEvents: order.status == 3 ? 'none' : 'all',
                            display: order.status == 3 ? 'none' : '',
                          }}
                          className={`${styles.nextStageBtn} ${styles.button}`}
                          onClick={() => handleNext(order._id, order)}
                        >
                          Next Stage
                        </button>
                        <button
                          className={`${styles.deleteBtn} ${styles.button}`}
                          onClick={() => handleOrderDelete(order._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })
            )}
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
    },
  };
};
