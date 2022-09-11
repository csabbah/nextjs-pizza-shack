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
        // If user clicks on nav stack icon, open nav menu and take precedence over the other conditional
        if (
          e.target.getAttribute('data-id') == 'navStack' ||
          e.target.outerHTML ==
            '<path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"></path>'
        ) {
          return setMobile(!mobile);
        }

        // First check if the mobile nav is active then...
        if (mobile) {
          // If innerText is blank or does not contain 'Home' which is a nav menu item
          // That means user clicked outside the Nav so set mobile to false
          if (e.target.innerText == undefined) {
            return setMobile(!mobile);
          }
          if (
            e.target.innerText == '' ||
            !e.target.innerText.includes('HOME')
          ) {
            // Then close the nav menu
            setMobile(false);
          }
        }
      }}
    >
      <Navbar setMobile={setMobile} mobile={mobile} />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
