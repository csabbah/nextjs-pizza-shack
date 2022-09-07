import styles from '../styles/Featured.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
const Featured = () => {
  const image = [
    '/img/featured.png',
    '/img/featured2.png',
    '/img/featured3.png',
  ];

  const [index, setIndex] = useState(0);

  const [autoScroll, setAutoScroll] = useState(true);

  const handleArrow = (direction) => {
    if (direction === 'l') {
      setIndex(index !== 0 ? index - 1 : 2);
      setAutoScroll(false);
    }

    if (direction === 'r') {
      setIndex(index !== 2 ? index + 1 : 0);
      setAutoScroll(false);
    }
  };

  useEffect(() => {
    if (autoScroll) {
      const interval = setInterval(() => {
        setIndex(index !== 2 ? index + 1 : 0);
      }, 3000);

      return () => clearInterval(interval);
    }
  });

  return (
    <div style={{ position: 'relative' }}>
      <div className={styles.container}>
        <div className={styles.arrowContainer}>
          <IoIosArrowBack
            className={styles.arrow}
            onClick={() => handleArrow('r')}
          />
        </div>
        <div
          className={styles.wrapper}
          style={{ transform: `translateX(${-100 * index}vw)` }}
        >
          {image.map((image, key) => {
            return (
              <div key={key} className={styles.imgContainer}>
                <Image layout="fill" src={image} alt={`FeaturedImage-${key}`} />
              </div>
            );
          })}
        </div>

        <div className={styles.arrowContainer}>
          <IoIosArrowForward
            className={styles.arrow}
            onClick={() => handleArrow('r')}
          />
        </div>
      </div>
      <div className={styles.indexesContainer}>
        {image.map((image, i) => {
          return (
            <div
              key={i}
              style={{ opacity: i == index ? '1' : '0.4' }}
              className={styles.indexes}
              onClick={() => {
                setIndex(i);
                setAutoScroll(false);
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Featured;
