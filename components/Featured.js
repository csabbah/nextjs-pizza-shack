import styles from '../styles/Featured.module.css';
import Image from 'next/image';
import { useState } from 'react';

const Featured = () => {
  const image = [
    '/img/featured.png',
    '/img/featured2.png',
    '/img/featured3.png',
  ];

  const [index, setIndex] = useState(0);

  const handleArrow = (direction) => {
    if (direction === 'l') {
      setIndex(index !== 0 ? index - 1 : 2);
    }

    if (direction === 'r') {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };

  console.log(index);
  return (
    <div className={styles.container}>
      <div className={styles.arrowContainer}>
        <Image
          layout="fill"
          src="/img/arrowl.png"
          alt=""
          onClick={() => handleArrow('l')}
        />
      </div>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {image.map((image, key) => {
          return (
            <div key={key} className={styles.imgContainer}>
              <Image layout="fill" src={image} alt="" />
            </div>
          );
        })}
      </div>
      <div className={styles.arrowContainer}>
        <Image
          layout="fill"
          width="25px"
          height="25px"
          src="/img/arrowr.png"
          alt=""
          onClick={() => handleArrow('r')}
        />
      </div>
    </div>
  );
};

export default Featured;
