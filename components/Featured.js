import styles from '../styles/Featured.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { useSelector } from 'react-redux';

const Featured = () => {
  const featuredImages = useSelector((state) => state.featuredImages);

  const image = featuredImages.images;

  const [index, setIndex] = useState(0);

  const [autoScroll, setAutoScroll] = useState(true);

  const handleArrow = (direction) => {
    setAutoScroll(false);
    if (direction === 'l') {
      setIndex(index !== 0 ? index - 1 : 2);
    }

    if (direction === 'r') {
      setIndex(index !== 2 ? index + 1 : 0);
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

  const [touchPosition, setTouchPosition] = useState(null);
  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      setIndex(index !== 2 ? index + 1 : 0);
    }

    if (diff < -5) {
      setIndex(index !== 0 ? index - 1 : 2);
    }

    setTouchPosition(null);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        className={styles.container}
        onTouchStart={(e) => handleTouchStart(e)}
        onTouchMove={(e) => handleTouchMove(e)}
      >
        <div className={styles.arrowContainer}>
          <IoIosArrowBack
            className={styles.arrow}
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
