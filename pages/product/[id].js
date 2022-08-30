import styles from '../../styles/Product.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProductQuantity } from '../../redux/cartSlice';

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

  // This handles the chosen size of pizza (each size of the pizza is a different al)
  const handleSize = (sizeIndex) => {
    SetPizzaSize(sizeIndex);
    setPrice(pizza.prices[sizeIndex]);
  };

  // This function handles the extras options
  // Adding/subtracting from price and adding/removing chosen options to an array
  const handleExtras = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      // If extra is checked, add it to the active price value
      setPrice(price + option.price);

      // Add the chosen extras to the state array
      setChosenExtras([...chosenExtras, option]);
    } else {
      // If extra is unchecked, minus it from the active price value
      setPrice(price - option.price);

      // Remove the extra that was unchecked
      setChosenExtras(chosenExtras.filter((extra) => extra._id !== option._id));
    }
  };

  const [existingProd, setExistingProd] = useState(false);

  // On page load, check the cart and make sure that the product the user is viewing (via component)
  // Is not already in their cart, if it is, simply update the quantity of it instead (as seen in handleClick)
  useEffect(() => {
    if (!cart.products.length == 0) {
      cart.products.forEach((product) => {
        if (product._id == pizza._id) {
          return setExistingProd(true);
        }
        setExistingProd(false);
      });
    }
  });

  const handleClick = () => {
    // If the product already exists in the cart, then update the quantity instead of adding the entire product again
    if (existingProd) {
      dispatch(
        updateProductQuantity({
          ...pizza,
          pizzaSize,
          pizzaId: pizza._id,
          quantity: parseInt(quantity),
          price: parseInt(price),
        })
      );
    } else {
      dispatch(
        addProduct({
          ...pizza,
          chosenExtras,
          pizzaSize,
          quantity: parseInt(quantity),
          price: parseInt(price),
        })
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.title}>{pizza.title}</div>
        <span className={styles.price}>${price}</span>
        <div className={styles.desc}>{pizza.desc}</div>
        <h3 className={styles.choose}>Choose your size:</h3>
        <div className={styles.sizes}>
          <div
            onClick={() => handleSize(0)}
            className={styles.size}
            style={{ opacity: pizzaSize == 0 ? '1' : '0.4' }}
          >
            <Image src="/img/size.png " layout="fill" alt="" />
            <span className={styles.sizeLabel}>Small</span>
          </div>
          <div
            onClick={() => handleSize(1)}
            className={styles.size}
            style={{ opacity: pizzaSize == 1 ? '1' : '0.4' }}
          >
            <Image src="/img/size.png " layout="fill" alt="" />
            <span className={styles.sizeLabel}>Medium</span>
          </div>
          <div
            onClick={() => handleSize(2)}
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
                <input
                  onChange={(e) => handleExtras(e, option)}
                  type="checkbox"
                  id={option.text}
                  name={option.text}
                  className={styles.checkbox}
                />
                <label htmlFor={option.text}>{option.text}</label>
              </div>
            );
          })}
        </div>
        <div className={styles.add}>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            min="1"
            defaultValue={1}
            className={styles.quantity}
          />
          <button className={styles.button} onClick={() => handleClick()}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );
  return {
    props: {
      pizza: res.data,
    },
  };
};

export default Product;
