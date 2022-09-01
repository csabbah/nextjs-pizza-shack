import Navbar from './Navbar';
import Footer from './Footer';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/cartSlice';

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  const [mobile, setMobile] = useState(false);

  // This will execute ONCE as a whole (after a refresh)
  // This will return local storage cart items and dispatch them to the cart (state manager)
  // Ensuring that even if user refreshes page, the cart items are still in their cart (until deleted)
  function returnCartLocal() {
    var localCartItems = localStorage.getItem('cartItems');
    if (localCartItems === null) {
    } else {
      let parsedCartItems = JSON.parse(localCartItems);

      parsedCartItems.forEach((item) => {
        dispatch(
          addProduct({
            ...item,
            chosenExtras: item.chosenExtras,
            pizzaSize: item.pizzaSize,
            quantity: parseInt(item.quantity),
            price: parseInt(item.price),
            customId: item.customId,
          })
        );
      });
    }
  }

  const [runOnce, setRunOnce] = useState(true);
  useEffect(() => {
    if (runOnce) {
      returnCartLocal();
      setRunOnce(false);
    }
  }, []);
  return (
    <div
      onClick={(e) => {
        console.log(e.target.innerText);
        // If user clicks on navstack icon, open nav menu and take precedence over the other conditional
        if (
          e.target.src ==
          'http://localhost:3000/_next/image?url=%2Fimg%2FnavIcon.png&w=128&q=75'
        ) {
          return setMobile(!mobile);
        }
        // If innerText is blank (which mean user clicks on anything BUT the nav menu)
        if (e.target.innerText == '' || !e.target.innerText.includes('Home')) {
          // Then close the nav menu
          setMobile(false);
        }
      }}
    >
      <Navbar setMobile={setMobile} mobile={mobile} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
