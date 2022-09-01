import Navbar from './Navbar';
import Footer from './Footer';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/cartSlice';

const Layout = ({ children }) => {
  const dispatch = useDispatch();

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
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
