import styles from '../styles/Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { useState } from 'react';

import { GiHamburgerMenu } from 'react-icons/gi';
import { useRouter } from 'next/router';

import TabletNav from '../components/TabletNav';
import MobileNav from './MobileNav';

const Navbar = ({ mobile, setMobile }) => {
  const router = useRouter();
  let endpointName = router.pathname;

  const [color, setColor] = useState('#fcedda');
  // Initially this is 0
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div>
      <div className={styles.mobileNav}>
        <MobileNav />
      </div>
      <div className={styles.tabletNav}>
        <div
          className={`${styles.navStack} ${
            mobile ? styles.activeStack : styles.inactiveStack
          } `}
        >
          <span data-id="navStack">
            <GiHamburgerMenu
              data-id="navStack"
              className={`${
                mobile ? styles.activeStack : styles.inactiveStack
              } ${styles.customIcon}`}
            />
          </span>
        </div>
        <div className={mobile ? styles.activeNav : styles.inactiveNav}>
          <TabletNav setMobile={setMobile} mobile={mobile} />
        </div>
      </div>
      <div
        className={styles.desktopContainer}
        style={
          endpointName !== '/'
            ? { boxShadow: '0 0 15px 0 rgba(0, 0, 0, 0.2)' }
            : { boxShadow: 'none' }
        }
      >
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
                style={{ color: endpointName == '/' ? 'black' : color }}
                className={`${styles.listItem}`}
              >
                Home
              </li>
            </Link>
            <span style={{ fontSize: '16px', opacity: '0.4' }}>/</span>
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
              >
                Admin
              </li>
            </Link>
            <span style={{ fontSize: '16px', opacity: '0.4' }}>/</span>
            {/* <Link href="/" passHref>
              <Image
                style={{ cursor: 'pointer' }}
                src="/img/logo.png"
                alt=""
                width="160px"
                height="69px"
              />
            </Link> */}
            <Link href="/trackorder" passHref>
              <li
                style={{
                  color: endpointName == '/trackorder' ? 'black' : color,
                }}
                className={styles.listItem}
              >
                Track order
              </li>
            </Link>
            <span style={{ fontSize: '16px', opacity: '0.4' }}>/</span>

            <Link href="/contact" passHref>
              <li
                style={{
                  color: endpointName == '/contact' ? 'black' : color,
                }}
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
                  filter: endpointName == '/cart' ? 'invert(1)' : 'invert(0)',
                }}
                src="/img/cart.png"
                alt=""
                width="30px"
                height="30px"
              />
              <div
                style={{
                  backgroundColor: endpointName == '/cart' ? 'black' : color,
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
