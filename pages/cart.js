import styles from '../styles/Cart.module.css';
import Image from 'next/image';
import Head from 'next/head';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';

import axios from 'axios';
import { useRouter } from 'next/router';
import {
  reset,
  deletePizza,
  updateCart,
  updateProductQuantity,
  updateProductQuantityDec,
} from '../redux/cartSlice';

import OrderDetail from '../components/OrderDetail';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);

  // This values are the props in the UI
  const amount = cart.total;
  const currency = 'USD';
  const style = { layout: 'vertical' };

  const router = useRouter();

  const createOrder = async (data) => {
    try {
      // Use the post method to create the Order data
      const res = await axios.post('http://localhost:3000/api/orders', data);
      // If successful, redirect user to /orders/ page and pass the id of the Order we just created
      // router is a nextjs function
      res.status === 201 && router.push('/orders/' + res.data._id);

      // After the order has been created, we then reset the Redux state manager
      dispatch(reset());
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (pizzaId) => {
    cart.products.forEach((product) => {
      if (product.customId == pizzaId) {
        dispatch(deletePizza({ pizzaId: product.customId }));
        dispatch(
          updateCart({ price: product.price, quantity: product.quantity })
        );
      }
    });
  };

  const handleUpdate = (pizza, pizzaId, price) => {
    dispatch(
      updateProductQuantity({
        ...pizza,
        pizzaId: pizzaId,
        quantity: 1,
        price,
      })
    );
  };

  const handleUpdateDec = (pizza, pizzaId, price, quantity) => {
    if (quantity == 1) {
      cart.products.forEach((product) => {
        if (product.customId == pizzaId) {
          dispatch(deletePizza({ pizzaId: product.customId }));
          dispatch(
            updateCart({ price: product.price, quantity: product.quantity })
          );
        }
      });
    } else {
      dispatch(
        updateProductQuantityDec({
          ...pizza,
          pizzaId: pizzaId,
          quantity: 1,
          price,
        })
      );
    }
  };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;

              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                // method 1 is paypal - method 0 is cash
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  const returnSize = (index) => {
    if (index == 0) {
      return 'Small';
    }
    if (index == 1) {
      return 'Medium';
    }
    if (index == 2) {
      return 'Large';
    }
  };

  return (
    <>
      <Head>
        <title>Shopping Cart</title>
      </Head>
      {cart.products.length == 0 ? (
        <div className={styles.container}>
          <h4 style={{ textAlign: 'center' }}>No pizzas in cart</h4>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.left}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.trTitle}>
                  <th>Product</th>
                  <th>Size</th>
                  <th>Name</th>
                  <th>Extras</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map((pizza) => {
                  return (
                    <tr className={styles.tr} key={pizza.customId}>
                      <td>
                        <div className={styles.imgContainer}>
                          <Image
                            src={pizza.img}
                            layout="fill"
                            objectFit="cover"
                            alt=""
                          />
                        </div>
                      </td>
                      <td>
                        <span className={styles.size}>
                          {returnSize(pizza.pizzaSize)}
                        </span>
                      </td>
                      <td>
                        <span className={styles.name}>{pizza.title}</span>
                      </td>
                      <td>
                        <span className={styles.extras}>
                          {pizza.chosenExtras.length == 0
                            ? 'No Extras'
                            : pizza.chosenExtras.map((extra) => {
                                return (
                                  <span key={extra._id}>
                                    {extra.text}
                                    <span className={styles.extraPrice}>
                                      (+${extra.price})
                                    </span>
                                    {
                                      // Only include 'and' to the 2nd last name
                                      pizza.chosenExtras.length > 1
                                        ? pizza.chosenExtras.indexOf(extra) ==
                                          pizza.chosenExtras.length - 2
                                          ? ` & `
                                          : // add a comma in between names (starting at when a 3rd user is added and beyond)
                                          pizza.chosenExtras.indexOf(extra) !==
                                            pizza.chosenExtras.length - 1
                                          ? `, `
                                          : ''
                                        : ''
                                    }
                                  </span>
                                );
                              })}
                        </span>
                      </td>
                      <td>
                        <span className={styles.price}>${pizza.price}</span>
                      </td>
                      <td>
                        <span id="prodQuantity" className={styles.quantity}>
                          {pizza.quantity}
                          <span className={styles.arrowWrapper}>
                            <Image
                              className={styles.upArrow}
                              src={'/img/uArrow.png'}
                              width={18}
                              height={18}
                              alt="Up Arrow"
                              objectFit="contain"
                              onClick={() =>
                                handleUpdate(pizza, pizza.customId, pizza.price)
                              }
                            />
                            <Image
                              className={styles.downArrow}
                              src={'/img/dArrow.png'}
                              width={18}
                              height={18}
                              alt="Down Arrow"
                              objectFit="contain"
                              onClick={() =>
                                handleUpdateDec(
                                  pizza,
                                  pizza.customId,
                                  pizza.price,
                                  pizza.quantity
                                )
                              }
                            />
                          </span>
                        </span>
                      </td>
                      <td>
                        <span className={styles.total}>
                          ${pizza.price * pizza.quantity}
                        </span>
                      </td>
                      <td>
                        <button
                          className={styles.btn}
                          onClick={() => handleDelete(pizza.customId)}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={styles.right}>
            <div className={styles.wrapper}>
              <h2 className={styles.title}>CART TOTAL</h2>
              <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
              </div>
              <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Discount:</b>$0.00
              </div>
              <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Total:</b>${cart.total}
              </div>
              {open ? (
                <div className={styles.paymentMethods}>
                  <button
                    onClick={() => setCash(true)}
                    className={styles.payButton}
                  >
                    CASH ON DELIVERY
                  </button>
                  <PayPalScriptProvider
                    options={{
                      'client-id':
                        'AWiiyj7StZgdPlQgDbShVXUJnSFiguIUNpAD5gWMG8-XHju1xZXh9n6o3RLIH8_SXetHX04OqZJwmUJJ',
                      components: 'buttons',
                      currency: 'USD',
                      'disable-funding': 'credit,card,p24',
                    }}
                  >
                    <ButtonWrapper currency={currency} showSpinner={false} />
                  </PayPalScriptProvider>
                </div>
              ) : (
                <button className={styles.button} onClick={() => setOpen(true)}>
                  CHECKOUT NOW!
                </button>
              )}
            </div>
          </div>
          {cash && (
            <OrderDetail
              setOpen={setOpen}
              setCash={setCash}
              total={cart.total}
              createOrder={createOrder}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
