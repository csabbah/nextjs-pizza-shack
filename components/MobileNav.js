import React, { useState } from 'react';
import styles from '../styles/MobileNav.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AiOutlineHome, AiFillHome, AiOutlineMail } from 'react-icons/ai';
import {
  MdOutlineAdminPanelSettings,
  MdAdminPanelSettings,
  MdEmail,
} from 'react-icons/md';
import { HiOutlineShoppingCart, HiShoppingCart } from 'react-icons/hi';
import { RiSearchLine, RiSearchFill } from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';

const MobileNav = () => {
  const router = useRouter();
  let endpointName = router.pathname;

  const [color, setColor] = useState('#fcedda');
  const [color2, setColor2] = useState('#ee4e34');

  const [active, setActive] = useState(false);

  // Initially this is 0
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={styles.container}>
      <ul className={styles.ul}>
        <li
          className={`${styles.listItem} ${styles.navStack} ${
            active ? styles.active : ''
          }`}
        >
          <GiHamburgerMenu
            data-id="navStack"
            style={{ fontSize: '40px' }}
            onClick={() => setActive(!active)}
          />
        </li>
        <Link href="/" passHref>
          <li
            style={
              endpointName == '/'
                ? {
                    backgroundColor: color,
                    color: color2,
                  }
                : {}
            }
            onClick={() => setActive(false)}
            className={`${styles.listItem} ${active ? styles.active : ''}`}
          >
            <div className={styles.innerItemUpper}>
              {endpointName == '/' ? (
                <AiFillHome style={{ fontSize: '23px' }} />
              ) : (
                <AiOutlineHome style={{ fontSize: '23px' }} />
              )}
              <span style={{ fontSize: '11px' }}>Home</span>
            </div>
            <div
              style={{
                backgroundColor: endpointName == '/' ? color : color2,
              }}
              className={styles.innerItem}
            ></div>
          </li>
        </Link>
        <Link href="/admin" passHref>
          <li
            style={
              endpointName == '/admin' || endpointName == '/admin/login'
                ? {
                    backgroundColor: color,
                    color: color2,
                  }
                : {}
            }
            onClick={() => setActive(false)}
            className={`${styles.listItem} ${active ? styles.active : ''}`}
          >
            <div className={styles.innerItemUpper}>
              {endpointName == '/admin' || endpointName == '/admin/login' ? (
                <MdAdminPanelSettings style={{ fontSize: '23px' }} />
              ) : (
                <MdOutlineAdminPanelSettings style={{ fontSize: '23px' }} />
              )}
              <span style={{ fontSize: '11px' }}>Admin</span>
            </div>
            <div
              style={{
                backgroundColor:
                  endpointName == '/admin' || endpointName == '/admin/login'
                    ? color
                    : color2,
              }}
              className={styles.innerItem}
            ></div>
          </li>
        </Link>
        <Link href="/trackorder" passHref>
          <li
            style={
              endpointName == '/trackorder'
                ? {
                    backgroundColor: color,
                    color: color2,
                  }
                : {}
            }
            onClick={() => setActive(false)}
            className={`${styles.listItem} ${active ? styles.active : ''}`}
          >
            <div className={styles.innerItemUpper}>
              {endpointName == '/trackorder' ? (
                <RiSearchFill style={{ fontSize: '23px' }} />
              ) : (
                <RiSearchLine style={{ fontSize: '23px' }} />
              )}
              <span style={{ fontSize: '11px' }}>Order</span>
            </div>
            <div
              style={{
                backgroundColor: endpointName == '/trackorder' ? color : color2,
              }}
              className={styles.innerItem}
            ></div>
          </li>
        </Link>
        <Link href="/cart" passHref>
          <div className={styles.item} onClick={() => setActive(false)}>
            <div className={quantity == 0 ? styles.default : styles.cart}>
              <li
                style={
                  endpointName == '/cart'
                    ? {
                        backgroundColor: color,
                        color: color2,
                      }
                    : {}
                }
                className={`${styles.listItem} ${active ? styles.active : ''}`}
              >
                <div className={styles.innerItemUpper}>
                  {quantity !== 0 ? (
                    <div className={styles.counter}>
                      <span>{quantity}</span>
                    </div>
                  ) : (
                    ''
                  )}
                  <div className={`${styles.icon} `}>
                    {endpointName == '/cart' ? (
                      <HiShoppingCart style={{ fontSize: '23px' }} />
                    ) : (
                      <HiOutlineShoppingCart style={{ fontSize: '23px' }} />
                    )}
                  </div>
                  <span style={{ fontSize: '11px' }}>Cart</span>
                </div>
                <div
                  style={{
                    backgroundColor: endpointName == '/cart' ? color : color2,
                  }}
                  className={styles.innerItem}
                ></div>
              </li>
            </div>
          </div>
        </Link>
      </ul>
    </div>
  );
};

export default MobileNav;
