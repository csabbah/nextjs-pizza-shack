import styles from '../styles/Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const Navbar = () => {
  // Initially this is 0
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={styles.container}>
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
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
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
            <li className={styles.listItem}>Track order</li>
          </Link>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <Link href="/cart">
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
