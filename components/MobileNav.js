import styles from '../styles/Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

const Navbar = ({ setMobile }) => {
  const router = useRouter();
  let endpointName = router.pathname;

  // Initially this is 0
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={styles.mobileContainer}>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/" passHref>
            <li
              style={{ color: endpointName == '/' ? 'black' : '' }}
              className={`${styles.listItem}`}
              onClick={() => setMobile(false)}
            >
              Home
            </li>
          </Link>
          <Link href="/admin" passHref>
            <li
              style={{
                color:
                  endpointName == '/admin'
                    ? 'black'
                    : endpointName == '/admin/login'
                    ? 'black'
                    : '',
              }}
              className={`${styles.listItem}`}
              onClick={() => setMobile(false)}
            >
              Admin
            </li>
          </Link>
          <Link href="/trackorder" passHref>
            <li
              style={{ color: endpointName == '/trackorder' ? 'black' : '' }}
              className={styles.listItem}
              onClick={() => setMobile(false)}
            >
              Track order
            </li>
          </Link>
          <Link href="/contact" passHref>
            <li
              style={{ color: endpointName == '/contact' ? 'black' : '' }}
              className={styles.listItem}
              onClick={() => setMobile(false)}
            >
              Contact
            </li>
          </Link>
          <Link href="/cart" passHref>
            <div className={styles.item}>
              <div className={quantity == 0 ? styles.default : styles.cart}>
                <li
                  style={{ color: endpointName == '/cart' ? 'black' : '' }}
                  className={styles.listItem}
                  onClick={() => setMobile(false)}
                >
                  Cart
                  <div
                    style={{
                      backgroundColor: endpointName == '/cart' ? 'black' : '',
                    }}
                    className={styles.counter}
                  >
                    <span>{quantity == 0 ? '' : quantity}</span>
                  </div>
                </li>
              </div>
            </div>
          </Link>
        </ul>
      </div>
      <div className={styles.item}></div>
    </div>
  );
};

export default Navbar;
