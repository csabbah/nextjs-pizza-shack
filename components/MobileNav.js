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

const MobileNav = () => {
  const router = useRouter();
  let endpointName = router.pathname;

  const [color, setColor] = useState('#fcedda');
  const [color2, setColor2] = useState('#ee4e34');

  // Initially this is 0
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={styles.container}>
      <ul className={styles.ul}>
        <Link href="/" passHref>
          <li
            style={{
              color: endpointName == '/' ? color2 : color,
              backgroundColor: endpointName == '/' ? color : color2,
            }}
            className={`${styles.listItem}`}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {endpointName == '/' ? (
                <AiFillHome style={{ fontSize: '23px' }} />
              ) : (
                <AiOutlineHome style={{ fontSize: '23px' }} />
              )}
              <span style={{ fontSize: '12px' }}>Home</span>
            </div>
          </li>
        </Link>
        <span className={styles.divider} />
        <Link href="/admin" passHref>
          <li
            style={{
              color:
                endpointName == '/admin' || endpointName == '/admin/login'
                  ? color2
                  : color,
              backgroundColor:
                endpointName == '/admin' || endpointName == '/admin/login'
                  ? color
                  : color2,
            }}
            className={`${styles.listItem}`}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {endpointName == '/admin' || endpointName == '/admin/login' ? (
                <MdAdminPanelSettings style={{ fontSize: '23px' }} />
              ) : (
                <MdOutlineAdminPanelSettings style={{ fontSize: '23px' }} />
              )}
              <span style={{ fontSize: '12px' }}>Admin</span>
            </div>
          </li>
        </Link>
        <span className={styles.divider} />
        <Link href="/trackorder" passHref>
          <li
            style={{
              color: endpointName == '/trackorder' ? color2 : color,
              backgroundColor: endpointName == '/trackorder' ? color : color2,
            }}
            className={styles.listItem}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {endpointName == '/trackorder' ? (
                <RiSearchFill style={{ fontSize: '23px' }} />
              ) : (
                <RiSearchLine style={{ fontSize: '23px' }} />
              )}
              <span style={{ fontSize: '12px' }}>Order</span>
            </div>
          </li>
        </Link>
        <span className={styles.divider} />
        <Link href="/contact" passHref>
          <li
            style={{
              color: endpointName == '/contact' ? color2 : color,
              backgroundColor: endpointName == '/contact' ? color : color2,
            }}
            className={styles.listItem}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {endpointName == '/contact' ? (
                <MdEmail style={{ fontSize: '23px' }} />
              ) : (
                <AiOutlineMail style={{ fontSize: '23px' }} />
              )}
              <span style={{ fontSize: '12px' }}>Contact</span>
            </div>
          </li>
        </Link>
        <span className={styles.divider} />
        <Link href="/cart" passHref>
          <div className={styles.item}>
            <div className={quantity == 0 ? styles.default : styles.cart}>
              <li
                style={{
                  color: endpointName == '/cart' ? color2 : color,
                  backgroundColor: endpointName == '/cart' ? color : color2,
                }}
                className={styles.listItem}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {endpointName == '/cart' ? (
                    <HiShoppingCart style={{ fontSize: '23px' }} />
                  ) : (
                    <HiOutlineShoppingCart style={{ fontSize: '23px' }} />
                  )}
                  <span style={{ fontSize: '12px' }}>Cart</span>
                </div>
                {/* <div
                  style={{
                    backgroundColor: endpointName == '/cart' ? 'black' : color,
                  }}
                  className={styles.counter}
                >
                  <span>{quantity == 0 ? '' : quantity}</span>
                </div> */}
              </li>
            </div>
          </div>
        </Link>
      </ul>
    </div>
  );
};

export default MobileNav;
