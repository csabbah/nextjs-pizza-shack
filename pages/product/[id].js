import styles from '../../styles/Product.module.css';
import Image from 'next/image';
import { useState } from 'react';

const Product = () => {
  const [size, setSize] = useState(0);

  const pizza = {
    id: 1,
    img: '/img/pizza.png',
    name: 'CAMPGNOLA',
    price: [19.9, 23.9, 26.9],
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.title}>{pizza.name}</div>
        <span className={styles.price}>${pizza.price[size]}</span>
        <div className={styles.desc}>{pizza.desc}</div>
        <h3 className={styles.choose}>Choose your size:</h3>
        <div className={styles.sizes}>
          <div onClick={() => setSize(0)} className={styles.size}>
            <Image src="/img/size.png " layout="fill" alt="" />
            <span className={styles.sizeLabel}>Small</span>
          </div>
          <div onClick={() => setSize(1)} className={styles.size}>
            <Image src="/img/size.png " layout="fill" alt="" />
            <span className={styles.sizeLabel}>Medium</span>
          </div>
          <div onClick={() => setSize(2)} className={styles.size}>
            <Image src="/img/size.png " layout="fill" alt="" />
            <span className={styles.sizeLabel}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          <div className={styles.option}>
            <input
              type="checkbox"
              id="double"
              name="double"
              className={styles.checkbox}
            />
            <label htmlFor="double">Double ingredients</label>
          </div>
          <div className={styles.option}>
            <input
              type="checkbox"
              id="cheese"
              name="cheese"
              className={styles.checkbox}
            />
            <label htmlFor="cheese">Extra Cheese</label>
          </div>
          <div className={styles.option}>
            <input
              type="checkbox"
              id="spicy"
              name="spicy"
              className={styles.checkbox}
            />
            <label htmlFor="spicy">Spicy Sauce</label>
          </div>
          <div className={styles.option}>
            <input
              type="checkbox"
              id="garlic"
              name="garlic"
              className={styles.checkbox}
            />
            <label htmlFor="garlic">Garlic Sauce</label>
          </div>
        </div>
        <div className={styles.add}>
          <input type="number" defaultValue={1} className={styles.quantity} />
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
