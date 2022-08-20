import styles from '../styles/Cart.module.css';
import Image from 'next/image';
import { useSelector } from 'react-redux';

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  console.log(cart);
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
              <button className={styles.button}>CHECKOUT NOW!</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
