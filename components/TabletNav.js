import styles from '../styles/Navbar.module.css';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';

import { useState } from 'react';

import { useRouter } from 'next/router';

const Navbar = ({ setMobile, mobile }) => {
  const router = useRouter();
  let endpointName = router.pathname;

  const [color, setColor] = useState('#fcedda');

  // Initially this is 0
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <>
      <div
        className={`${styles.background} ${
          mobile ? styles.true : styles.false
        }`}
      ></div>
      <div className={styles.tabletContainer}>
        <div className={styles.item}>
          <ul className={styles.list}>
            <AiOutlineClose
              onClick={() => setMobile(false)}
              className={styles.closeNav}
            />
            <Link href="/" passHref>
              <li
                style={{ color: endpointName == '/' ? 'black' : color }}
                className={`${styles.listItem}`}
                onClick={() => setMobile(false)}
              >
                Home
              </li>
            </Link>
            <hr className={styles.hr} />
            <Link href="/admin" passHref>
              <li
                style={{
                  color:
                    endpointName == '/admin'
                      ? 'black'
                      : endpointName == '/admin/login'
                      ? 'black'
                      : color,
                }}
                className={`${styles.listItem}`}
                onClick={() => setMobile(false)}
              >
                Admin
              </li>
            </Link>
            <hr className={styles.hr} />
            <Link href="/trackorder" passHref>
              <li
                style={{
                  color: endpointName == '/trackorder' ? 'black' : color,
                }}
                className={styles.listItem}
                onClick={() => setMobile(false)}
              >
                Track order
              </li>
            </Link>
            <hr className={styles.hr} />
            <Link href="/contact" passHref>
              <li
                style={{
                  color: endpointName == '/contact' ? 'black' : color,
                }}
                className={styles.listItem}
                onClick={() => setMobile(false)}
              >
                Contact
              </li>
            </Link>
            <hr className={styles.hr} />
            <Link href="/cart" passHref>
              <div className={styles.item}>
                <div className={quantity == 0 ? styles.default : styles.cart}>
                  <li
                    style={{
                      color: endpointName == '/cart' ? 'black' : color,
                    }}
                    className={styles.listItem}
                    onClick={() => setMobile(false)}
                  >
                    Cart
                    <div
                      style={{
                        backgroundColor:
                          endpointName == '/cart' ? 'black' : color,
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
    </>
  );
};

export default Navbar;
