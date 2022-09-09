import React, { useState, useEffect } from 'react';
import styles from '../../styles/Admin.module.css';
import Image from 'next/image';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEye } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import Add from '../../components/Add';

import { useRouter } from 'next/router';

import { server } from '../../utils/config.js';

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

  const [totalSum, setTotalSum] = useState(
    orderList.map((item) => item.total).reduce((a, b) => a + b)
  );

  function calculateAvg(total, price, index, array) {
    total += price;
    return index === array.length - 1 ? total / array.length : total;
  }

  const [averageTotal, setAverageTotal] = useState(
    orderList.map((item) => item.total).reduce(calculateAvg)
  );

  const status = ['Preparing', 'On the way', 'Delivered', 'Completed'];

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${server}/api/products/${id}`);

      // Normally, when we delete something from the database, it doesn't show right away
      // So, we update the pizzaList useState object which reflects realtime changes
      setPizzaList(pizzaList.filter((product) => product._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleOrderDelete = async (id) => {
    try {
      const res = await axios.delete(`${server}/api/orders/${id}`);

      setOrderList(orderList.filter((order) => order._id !== id));

      // Update total sum and average upon deleting data
      setTotalSum(
        orderList
          .filter((order) => order._id !== id)
          .map((item) => item.total)
          .reduce((a, b) => a + b)
      );
      setAverageTotal(
        orderList
          .filter((order) => order._id !== id)
          .map((item) => item.total)
          .reduce(calculateAvg)
      );
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
        const res = await axios.put(`${server}/api/orders/${id}`, {
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

  const [pizzaSize, setPizzaSize] = useState(0);

  const returnSize = (index) => {
    if (index == 0) {
      return 'Sm';
    }
    if (index == 1) {
      return 'Md';
    }
    if (index == 2) {
      return 'Lg';
    }
  };

  const [sorted, setSorted] = useState(true);
  const handleSort = (e, name) => {
    if (name == 'productsId') {
      var newList = [...pizzaList].sort((a, b) =>
        sorted
          ? a._id.toLowerCase() > b._id.toLowerCase()
            ? 1
            : -1
          : a._id.toLowerCase() < b._id.toLowerCase()
          ? 1
          : -1
      );
      setSorted(!sorted);
      setPizzaList(newList);
    }

    if (e == 'Title') {
      var newList = [...pizzaList].sort((a, b) =>
        sorted
          ? a.title.toLowerCase() > b.title.toLowerCase()
            ? 1
            : -1
          : a.title.toLowerCase() < b.title.toLowerCase()
          ? 1
          : -1
      );
      setSorted(!sorted);
      setPizzaList(newList);
    }

    if (e == 'Price') {
      var newList = [...pizzaList].sort((a, b) =>
        sorted
          ? a.prices[pizzaSize] > b.prices[pizzaSize]
            ? 1
            : -1
          : a.prices[pizzaSize] < b.prices[pizzaSize]
          ? 1
          : -1
      );
      setSorted(!sorted);
      setPizzaList(newList);
    }

    if (name == 'ordersId') {
      var newList = [...orderList].sort((a, b) =>
        sorted
          ? a._id.toLowerCase() > b._id.toLowerCase()
            ? 1
            : -1
          : a._id.toLowerCase() < b._id.toLowerCase()
          ? 1
          : -1
      );
      setSorted(!sorted);
      setOrderList(newList);
    }

    if (e == 'Customer') {
      var newList = [...orderList].sort((a, b) =>
        sorted
          ? a.customer.toLowerCase() > b.customer.toLowerCase()
            ? 1
            : -1
          : a.customer.toLowerCase() < b.customer.toLowerCase()
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

  const [productQuery, setProductQuery] = useState('');
  const [orderQuery, SetOrderQuery] = useState('');

  const checkInputVal = () => {
    var regex = /^[0-9]+$/;
    if (productQuery.match(regex) || orderQuery.match(regex)) {
      return true;
      // console.log('Number was inputted');
    } else {
      return false;
      // console.log('String was inputted');
    }
  };

  const returnMethodStr = (value) => {
    if (value == 1) {
      return 'paypal';
    } else {
      return 'cash';
    }
  };

  const returnStatusStr = (value) => {
    return status[value];
  };

  return (
    <div className={styles.outerContainer}>
      <Head>
        <title>Admin</title>
      </Head>
      <span
        className={styles.buttonWrapper}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <button onClick={() => setClose(false)} className={styles.addBtn}>
          + Add Pizza
        </button>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => logout()}
          className={styles.logout}
        >
          <BiLogOut style={{ display: 'flex', marginRight: '5px' }} />
          Logout
        </button>
      </span>
      {!close && (
        <Add
          setClose={setClose}
          pizzaList={pizzaList}
          setPizzaList={setPizzaList}
        />
      )}

      <div className={`${styles.container} container-fluid mt-4 admin-dash`}>
        <div className={`${styles.item}`}>
          <div className={styles.itemWrapper}>
            <h1 className={styles.title}>Products</h1>
            <span className={styles.input}>
              <input
                type="text"
                placeholder="Search Pizzas"
                onChange={(e) => setProductQuery(e.target.value.trim())}
              ></input>
              <FiSearch className={styles.icon} />
            </span>
          </div>
          <div className="table-responsive-sm">
            <table className={`${styles.table} table table-hover`}>
              <thead className={styles.thead}>
                <tr className={styles.trTitle}>
                  <th></th>
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
                    <span
                      onClick={() =>
                        setPizzaSize(pizzaSize !== 2 ? pizzaSize + 1 : 0)
                      }
                      style={{ marginLeft: '10px' }}
                    >
                      {returnSize(pizzaSize)}
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
                pizzaList
                  .filter((pizza) =>
                    checkInputVal()
                      ? // If no value exist then...
                        !parseInt(productQuery)
                        ? // return all prices
                          pizza.prices[pizzaSize]
                        : // else return the number that the user searched up (either equal to or less than)
                          pizza.prices[pizzaSize] <= parseInt(productQuery)
                      : pizza.title.toLowerCase().includes(productQuery) ||
                        pizza._id.toLowerCase().includes(productQuery)
                  )
                  .map((product) => {
                    return (
                      <tbody
                        className={styles.tbody}
                        key={product._id}
                        style={{ verticalAlign: 'revert' }}
                      >
                        <tr className={styles.trTitle}>
                          <td className={`${styles.td} tdImg`}>
                            <Image
                              src={product.img}
                              width={80}
                              height={80}
                              objectFit="contain"
                              alt=""
                            />
                          </td>
                          <td className={styles.td}>
                            {/* Show the first 5 letters */}
                            <span className={styles.init}>
                              <span className={styles.initInner}>
                                {product._id.slice(0, 5)}...
                              </span>
                              <span className={styles.id2}>
                                {/* Show everything but the first 5 letters */}
                                {/* {product._id.slice(5)} */}
                                {product._id}
                              </span>
                            </span>
                          </td>
                          <td className={styles.td}>{product.title}</td>
                          <td className={styles.td}>
                            ${product.prices[pizzaSize]}
                          </td>
                          <td className={styles.td}>
                            <span
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <Link href={`/product/${product._id}`} passHref>
                                <button
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                  className={`${styles.button}`}
                                >
                                  <AiFillEye
                                    className={styles.viewIcon}
                                    style={{
                                      display: 'flex',
                                      marginRight: '2px',
                                    }}
                                  />
                                  view
                                </button>
                              </Link>
                              <BsFillTrashFill
                                className={styles.deleteIcon}
                                onClick={() => handleDelete(product._id)}
                              />
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })
              )}
            </table>
          </div>
        </div>
        <hr className={styles.hr}></hr>
        <div className={styles.item}>
          <div className={styles.itemWrapper}>
            <h1 className={styles.title}>Orders</h1>
            <span className={styles.input}>
              <input
                type="text"
                placeholder="Search Orders"
                onChange={(e) => SetOrderQuery(e.target.value)}
              ></input>
              <FiSearch className={styles.icon} />
            </span>
          </div>
          <div className="table-responsive-lg">
            <table className={`${styles.table} table table-hover`}>
              <thead className={styles.thead}>
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
                orderList
                  .filter((order) =>
                    checkInputVal()
                      ? // If no value exist then...
                        !parseInt(orderQuery)
                        ? // return all prices
                          order.total
                        : // else return the number that the user searched up (either equal to or less than)
                          order.total <= parseInt(orderQuery)
                      : order._id.toLowerCase().includes(orderQuery) ||
                        order.customer.toLowerCase().includes(orderQuery) ||
                        returnMethodStr(order.method).includes(orderQuery) ||
                        returnStatusStr(order.status)
                          .toLowerCase()
                          .includes(orderQuery)
                  )
                  .map((order) => {
                    return (
                      <tbody
                        className={styles.tbody}
                        key={order._id}
                        style={{ verticalAlign: 'revert' }}
                      >
                        <tr className={styles.trTitle}>
                          <td className={styles.td}>
                            {/* Show the first 5 letters */}
                            <span className={styles.init}>
                              <span className={styles.initInner}>
                                {order._id.slice(0, 5)}...
                              </span>
                              <span className={styles.id}>
                                {/* Show everything but the first 5 letters */}
                                {/* {order._id.slice(5)} */}
                                {order._id}
                              </span>
                            </span>
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
                            <span className={styles.nextStageWrapper}>
                              <button
                                // Disable button if order status is 3 (2 == delivered)
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  pointerEvents:
                                    order.status == 3 ? 'none' : 'all',
                                  display: order.status == 3 ? 'none' : '',
                                }}
                                className={`${styles.nextStageBtn} ${styles.button}`}
                                onClick={() => handleNext(order._id, order)}
                              >
                                Next Stage
                              </button>
                              <BsFillTrashFill
                                className={styles.deleteIcon}
                                onClick={() => handleOrderDelete(order._id)}
                              />
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })
              )}
            </table>
          </div>
          <span style={{ display: 'flex', marginTop: '5px' }}>
            <p className={styles.extraData}>
              Grand Total:
              <span className={styles.extraDataSingle}>
                ${totalSum.toFixed(2)}
              </span>
            </p>
            <p className={styles.extraData}>
              Average Order Total:
              <span className={styles.extraDataSingle}>
                ${averageTotal.toFixed(2)}
              </span>
            </p>
          </span>
        </div>
      </div>
    </div>
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

  const products = await axios.get(`${server}/api/products`);
  const orders = await axios.get(`${server}/api/orders`);

  return {
    props: {
      orders: orders.data,
      products: products.data,
    },
  };
};
