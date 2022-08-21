import styles from '../styles/Cart.module.css';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';

const Cart = () => {
  const [open, setOpen] = useState(false);
  // This values are the props in the UI
  const amount = '2';
  const currency = 'USD';
  const style = { layout: 'vertical' };

  const cart = useSelector((state) => state.cart);

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
            return actions.order.capture().then(function () {
              // Your code here after capture the order
            });
          }}
        />
      </>
    );
  };

  return (
    <>
      {cart.products.length == 0 ? (
        <div className={styles.container}>
          <h4 style={{ textAlign: 'center' }}>No pizzas added to cart</h4>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.left}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.trTitle}>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Extras</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map((pizza) => {
                  return (
                    <tr className={styles.tr} key={pizza._id}>
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
                        <span className={styles.name}>{pizza.title}</span>
                      </td>
                      <td>
                        <span className={styles.extras}>
                          {pizza.extraOptions.map((extra) => {
                            return <span key={extra._id}>{extra.text}, </span>;
                          })}
                        </span>
                      </td>
                      <td>
                        <span className={styles.price}>${pizza.price}</span>
                      </td>
                      <td>
                        <span className={styles.quantity}>
                          {pizza.quantity}
                        </span>
                      </td>
                      <td>
                        <span className={styles.total}>
                          ${pizza.price * pizza.quantity}
                        </span>
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
                  <button className={styles.payButton}>CASH ON DELIVERY</button>
                  <PayPalScriptProvider
                    options={{
                      'client-id': 'test',
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
        </div>
      )}
    </>
  );
};

export default Cart;
