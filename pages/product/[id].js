import styles from '../../styles/Product.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';
import { BsCartPlus } from 'react-icons/bs';
import { server } from '../../utils/config.js';
import Head from 'next/head';

const Product = ({ pizza }) => {
  const cart = useSelector((state) => state.cart);

  // This variable allows us to dispatch our action (update state)
  const dispatch = useDispatch();

  const [pizzaSize, SetPizzaSize] = useState(0);
  // Remember, pizza.prices is an array of numbers
  const [price, setPrice] = useState(pizza.prices[0]);
  // Initial extras are an empty array
  const [chosenExtras, setChosenExtras] = useState([]);
  // Initial quantity is set to 1
  const [quantity, setQuantity] = useState(1);

  const [error, setError] = useState(false);

  const [customId, setCustomId] = useState();
  const [randomNum, setRandomNum] = useState(
    Math.floor(Math.random() * 10000000)
  );

  const changePrice = (number) => {
    setPrice(price + number);
  };

  // This handles the chosen size of pizza (each size of the pizza is a different al)
  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[pizzaSize];
    SetPizzaSize(sizeIndex);
    changePrice(difference);
  };

  // This function handles the extras options
  // Adding/subtracting from price and adding/removing chosen options to an array
  const handleExtras = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setChosenExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setChosenExtras(chosenExtras.filter((extra) => extra._id !== option._id));
    }
  };

  // const [existingProd, setExistingProd] = useState(false);

  // Function to save the cart Items to local storage
  function saveCartItem() {
    var localCartItems = localStorage.getItem('cartItems');
    let parsedCartItems = JSON.parse(localCartItems);

    if (parsedCartItems) {
      let tempVal = {
        ...pizza,
        chosenExtras,
        pizzaSize,
        quantity: parseInt(quantity),
        price: parseInt(price),
        customId: randomNum,
      };
      parsedCartItems.push(tempVal);

      localStorage.setItem('cartItems', JSON.stringify(parsedCartItems));
    } else {
      var tempArr = [];

      let tempVal = {
        ...pizza,
        chosenExtras,
        pizzaSize,
        quantity: parseInt(quantity),
        price: parseInt(price),
        customId: randomNum,
      };
      tempArr.push(tempVal);

      localStorage.setItem('cartItems', JSON.stringify(tempArr));
    }
  }

  // // On page load, check the cart and make sure that the product the user is viewing (via component)
  // // Is not already in their cart, if it is, simply update the quantity of it instead (as seen in handleClick)
  useEffect(() => {
    setCustomId(`${pizza._id}${pizzaSize}${randomNum}`);

    // if (!cart.products.length == 0) {
    //   cart.products.forEach((product) => {
    //     if (product.customId == customId) {
    //       return setExistingProd(true);
    //     }
    //     setExistingProd(false);
    //   });
    // }
  }, []);
  // }, [cart, cart.products, pizza._id, pizzaSize, customId, setCustomId]);

  const handleClick = () => {
    setRandomNum(Math.floor(Math.random() * 1000000));

    saveCartItem();

    if (quantity < 1) {
      setError(true);
    } else {
      dispatch(
        addProduct({
          ...pizza,
          chosenExtras,
          pizzaSize,
          quantity: parseInt(quantity),
          price: parseInt(price),
          customId: randomNum,
        })
      );
      // // If the product already exists in the cart, then update the quantity instead of adding the entire product again
      // if (existingProd) {
      //   dispatch(
      //     updateProductQuantity({
      //       ...pizza,
      //       customId,
      //       pizzaId: pizza._id,
      //       quantity: parseInt(quantity),
      //       price: parseInt(price),
      //     })
      //   );
      // } else {
      //   dispatch(
      //     addProduct({
      //       ...pizza,
      //       chosenExtras,
      //       customId,
      //       quantity: parseInt(quantity),
      //       price: parseInt(price),
      //     })
      //   );
      // }
    }
  };

  return (
    <>
      <Head>
        <title>Product</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=0;"
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.imgContainer}>
            <Image src={pizza.img} layout="fill" alt="" />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{pizza.title}</div>
          <span className={styles.price}>${price * quantity}</span>
          <div className={styles.desc}>{pizza.desc}</div>
          <h3 className={styles.choose}>Choose your size:</h3>
          <div className={styles.sizes}>
            <div
              onClick={() => {
                handleSize(0);
                setError(false);
              }}
              className={styles.size}
              style={{ opacity: pizzaSize == 0 ? '1' : '0.4' }}
            >
              <Image src="/img/size.png " layout="fill" alt="" />
              <span className={styles.sizeLabel}>Small</span>
            </div>
            <div
              onClick={() => {
                handleSize(1);
                setError(false);
              }}
              className={styles.size}
              style={{ opacity: pizzaSize == 1 ? '1' : '0.4' }}
            >
              <Image src="/img/size.png " layout="fill" alt="" />
              <span className={styles.sizeLabel}>Medium</span>
            </div>
            <div
              onClick={() => {
                handleSize(2);
                setError(false);
              }}
              className={styles.size}
              style={{ opacity: pizzaSize == 2 ? '1' : '0.4' }}
            >
              <Image src="/img/size.png " layout="fill" alt="" />
              <span className={styles.sizeLabel}>Large</span>
            </div>
          </div>
          <h3 className={`${styles.choose} ${styles.additional}`}>
            Choose additional ingredients
          </h3>
          <div className={styles.ingredients}>
            {pizza.extraOptions.map((option) => {
              return (
                <div key={option._id} className={styles.option}>
                  <label className={styles.checkboxLabel} htmlFor={option.text}>
                    <input
                      onChange={(e) => {
                        handleExtras(e, option);
                        setError(false);
                      }}
                      type="checkbox"
                      id={option.text}
                      name={option.text}
                      className={styles.checkbox}
                    />
                    <span></span>
                    {option.text}
                  </label>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex' }} className={styles.add}>
            <input
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
              min="1"
              defaultValue={1}
              className={styles.quantity}
            />
            <button
              style={{ display: 'flex', alignItems: 'center' }}
              className={styles.button}
              onClick={() => handleClick()}
            >
              Add to Cart
              <BsCartPlus style={{ marginLeft: '5px' }} />
            </button>
            {error && 'Please add a quantity of 1 or higher'}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`${server}/api/products/${params.id}`);
  return {
    props: {
      pizza: res.data,
    },
  };
};

export default Product;
