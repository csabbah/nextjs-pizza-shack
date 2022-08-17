import styles from '../../styles/Order.module.css';
import Image from 'next/image';

const Order = () => {
  const status = 0;

  // This works as intended regardless of how many steps there are
  const statusClass = (index) => {
    // If index minus status is less than 1, that means it is done (APPLY done CSS)
    if (index - status < 1) return styles.done;
    // If index minus status is 1, that means it's in progress (APPLY progress CSS)
    if (index - status === 1) return styles.inProgress;
    // If index minus status is greater than 1, this stage is completed (APPLY delivered CSS)
    if (index - status > 1) return styles.completed;
  };

  // // Here's another example that functions as the above statusClass method
  //   var current = [0, 0, 0, 0];
  //   if (status == 1) {
  //     current = [
  //       styles.done,
  //       styles.inProgress,
  //       styles.delivered,
  //       styles.delivered,
  //     ];
  //   }
  //   if (status == 2) {
  //     current = [styles.done, styles.done, styles.inProgress, styles.delivered];
  //   }

  //   if (status == 3) {
  //     current = [styles.done, styles.done, styles.done, styles.inProgress];
  //   }

  //   if (status == 4) {
  //     current = [styles.done, styles.done, styles.done, styles.done];
  //   }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tr}>
                <td>
                  <span className={styles.id}>129837819237</span>
                </td>
                <td>
                  <span className={styles.name}>John Doe</span>
                </td>
                <td>
                  <span className={styles.address}>Elton st. 212-33 LA</span>
                </td>
                <td>
                  <span className={styles.total}>$79.80</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.row}>
          {/* <div className={current[0]}> */}
          <div className={statusClass(0)}>
            <Image src="/img/paid.png" width={30} height={30} alt="" />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          {/* <div className={current[1]}> */}
          <div className={statusClass(1)}>
            <Image src="/img/bake.png" width={30} height={30} alt="" />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          {/* <div className={current[2]}> */}
          <div className={statusClass(2)}>
            <Image src="/img/bike.png" width={30} height={30} alt="" />
            <span>On the way</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          {/* <div className={current[3]}> */}
          <div className={statusClass(3)}>
            <Image src="/img/delivered.png" width={30} height={30} alt="" />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>$79.60
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>$79.60
          </div>
          <button disabled className={styles.button}>
            PAID
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
