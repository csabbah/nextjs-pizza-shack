import navBarStyles from '../styles/Navbar.module.css';
import Image from 'next/image';

const Navbar = () => {
  return (
    <div className={navBarStyles.container}>
      <div className={navBarStyles.item}>
        <div className={navBarStyles.callButton}>
          <Image
            width="32"
            height="32"
            src="/img/telephone.png"
            alt="phone icon"
          />
        </div>
        <div className={navBarStyles.texts}>
          <div className={navBarStyles.texts}>ORDER NOW!</div>
          <div className={navBarStyles.texts}>012 319 3910</div>
        </div>
      </div>
      <div className={navBarStyles.item}>
        <ul className={navBarStyles.list}>
          <li className={navBarStyles.listItem}>Homepage</li>
          <li className={navBarStyles.listItem}>Products</li>
          <li className={navBarStyles.listItem}>Menu</li>
          <Image src="/img/logo.png" alt="" width="160px" height="69px" />
          <li className={navBarStyles.listItem}>Events</li>
          <li className={navBarStyles.listItem}>Blog</li>
          <li className={navBarStyles.listItem}>Contact</li>
        </ul>
      </div>
      <div className={navBarStyles.item}>
        <div className={navBarStyles.cart}>
          <Image src="/img/cart.png" alt="" width="30px" height="30px" />
          <div className={navBarStyles.counter}>2</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
