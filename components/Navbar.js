import styles from '../styles/Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import MobileNav from '../components/MobileNav';

import { useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  let endpointName = router.pathname;

  // Initially this is 0
  const quantity = useSelector((state) => state.cart.quantity);

  const [mobile, setMobile] = useState(false);
  return (
    <div>
      <div
        className={`${styles.navStack} ${
          mobile ? styles.activeStack : styles.inactiveStack
        } `}
      >
        <Image
          className={mobile ? styles.activeStack : styles.inactiveStack}
          onClick={() => setMobile(!mobile)}
          style={{
            filter: 'invert(1)',
          }}
          src="/img/navIcon.png"
          alt=""
          width="50px"
          height="50px"
        />
      </div>
      <div className={mobile ? styles.activeNav : styles.inactiveNav}>
        <MobileNav setMobile={setMobile} />
      </div>
      <div className={styles.desktopContainer}>
        <div className={styles.item}>
          <div className={styles.callButton}>
            <Image
              width="32"
              height="32"
              src="/img/telephone.png"
              alt="phone icon"
            />
          </div>
          <div className={styles.texts}>
            <div className={styles.texts}>ORDER NOW!</div>
            <div className={styles.texts}>012 319 3910</div>
          </div>
        </div>
        <div className={styles.item}>
          <ul className={styles.list}>
            <Link href="/" passHref>
              <li
                style={{ color: endpointName == '/' ? 'black' : '' }}
                className={`${styles.listItem}`}
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
              >
                Admin
              </li>
            </Link>
            <Link href="/" passHref>
              <Image
                style={{ cursor: 'pointer' }}
                src="/img/logo.png"
                alt=""
                width="160px"
                height="69px"
              />
            </Link>
            <Link href="/trackorder" passHref>
              <li
                style={{ color: endpointName == '/trackorder' ? 'black' : '' }}
                className={styles.listItem}
              >
                Track order
              </li>
            </Link>
            <Link href="/contact" passHref>
              <li
                style={{ color: endpointName == '/contact' ? 'black' : '' }}
                className={styles.listItem}
              >
                Contact
              </li>
            </Link>
          </ul>
        </div>
        <Link href="/cart">
          <div className={styles.item}>
            <div className={quantity == 0 ? styles.default : styles.cart}>
              <Image
                style={{
                  filter: endpointName == '/cart' ? 'invert(1)' : '',
                }}
                src="/img/cart.png"
                alt=""
                width="30px"
                height="30px"
              />
              <div
                style={{
                  backgroundColor: endpointName == '/cart' ? 'black' : '',
                }}
                className={styles.counter}
              >
                <span>{quantity == 0 ? '' : quantity}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
