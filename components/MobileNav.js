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
            }}
            className={`${styles.listItem}`}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              className={styles.innerItemUpper}
            >
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
        <span className={styles.divider} />
        <Link href="/admin" passHref>
          <li
            style={{
              color:
                endpointName == '/admin' || endpointName == '/admin/login'
                  ? color2
                  : color,
            }}
            className={`${styles.listItem}`}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              className={styles.innerItemUpper}
            >
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
        <span className={styles.divider} />
        <Link href="/trackorder" passHref>
          <li
            style={{
              color: endpointName == '/trackorder' ? color2 : color,
            }}
            className={styles.listItem}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              className={styles.innerItemUpper}
            >
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
        <span className={styles.divider} />
        <Link href="/contact" passHref>
          <li
            style={{
              color: endpointName == '/contact' ? color2 : color,
            }}
            className={styles.listItem}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              className={styles.innerItemUpper}
            >
              {endpointName == '/contact' ? (
                <MdEmail style={{ fontSize: '23px' }} />
              ) : (
                <AiOutlineMail style={{ fontSize: '23px' }} />
              )}
              <span style={{ fontSize: '11px' }}>Contact</span>
            </div>
            <div
              style={{
                backgroundColor: endpointName == '/contact' ? color : color2,
              }}
              className={styles.innerItem}
            ></div>
          </li>
        </Link>
        <span className={styles.divider} />
        <Link href="/cart" passHref>
          <div className={styles.item}>
            <div className={quantity == 0 ? styles.default : styles.cart}>
              <li
                style={{
                  color: endpointName == '/cart' ? color2 : color,
                }}
                className={styles.listItem}
              >
                <div className={styles.innerItemUpper}>
                  <div
                    className={`${styles.icon} `}
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
                    <span style={{ fontSize: '11px' }}>Cart</span>
                  </div>
                  <div
                    style={{
                      backgroundColor: endpointName == '/cart' ? color2 : color,
                      color: endpointName == '/cart' ? color2 : color,
                    }}
                    className={styles.counter}
                  >
                    <span
                      style={{
                        color: endpointName == '/cart' ? color : color2,
                      }}
                    >
                      {quantity == 0 ? '' : quantity}
                    </span>
                  </div>
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
