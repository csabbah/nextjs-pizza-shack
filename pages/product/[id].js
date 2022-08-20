import styles from '../../styles/Product.module.css';
import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';

const Product = ({ pizza }) => {
  // This variable allows us to dispatch our action (update state)
  const dispatch = useDispatch();

  // Remember, pizza.prices is an array of numbers
  const [price, setPrice] = useState(pizza.prices[0]);
  // Initial extras are an empty array
  const [chosenExtras, setChosenExtras] = useState([]);
  // Initial quantity is set to 1
  const [quantity, setQuantity] = useState(1);

  // This handles the chosen size of pizza (each size of the pizza is a different al)
  const handleSize = (sizeIndex) => {
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

  const handleClick = () => {
    dispatch(addProduct({ ...pizza, chosenExtras, price, quantity }));
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
          <div onClick={() => handleSize(0)} className={styles.size}>
            <Image src="/img/size.png " layout="fill" alt="" />
            <span className={styles.sizeLabel}>Small</span>
          </div>
          <div onClick={() => handleSize(1)} className={styles.size}>
            <Image src="/img/size.png " layout="fill" alt="" />
            <span className={styles.sizeLabel}>Medium</span>
          </div>
          <div onClick={() => handleSize(2)} className={styles.size}>
            <Image src="/img/size.png " layout="fill" alt="" />
            <span className={styles.sizeLabel}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
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
