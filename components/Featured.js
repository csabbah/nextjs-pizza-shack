import styles from '../styles/Featured.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Featured = ({ masterStore }) => {
  const [images, setImage] = useState(masterStore);
  const [index, setIndex] = useState(0);

  // Only apple autoScroll if there are more then 2 images
  const [autoScroll, setAutoScroll] = useState(images.length >= 2);

  const handleArrow = (direction) => {
    setAutoScroll(false);
    if (direction === 'l') {
      setIndex(index !== 0 ? index - 1 : images.length - 1);
    }

    if (direction === 'r') {
      setIndex(index !== images.length - 1 ? index + 1 : 0);
    }
  };

  useEffect(() => {
    if (autoScroll) {
      const interval = setInterval(() => {
        setIndex(index !== images.length - 1 ? index + 1 : 0);
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
      setIndex(index !== images.length - 1 ? index + 1 : 0);
    }

    if (diff < -5) {
      setIndex(index !== 0 ? index - 1 : images.length - 1);
    }

    setTouchPosition(null);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        className={styles.container}
        onTouchStart={(e) => {
          images.length < 2 ? '' : handleTouchStart(e);
        }}
        onTouchMove={(e) => (images.length < 2 ? '' : handleTouchMove(e))}
      >
        {images.length < 2 ? (
          ''
        ) : (
          <div className={styles.arrowContainer}>
            <IoIosArrowBack
              className={styles.arrow}
              onClick={() => handleArrow('l')}
            />
          </div>
        )}

        <div
          className={styles.wrapper}
          style={{
            width: `${images.length}00vw`,
            transform: `translateX(${-100 * index}vw)`,
          }}
        >
          {images
            ? images.map((image, key) => {
                return (
                  <div key={key} className={styles.imgContainer}>
                    <Image
                      layout="fill"
                      src={image.featuredImg}
                      alt={`FeaturedImage-${key}`}
                    />
                  </div>
                );
              })
            : ''}
        </div>

        {images.length < 2 ? (
          ''
        ) : (
          <div className={styles.arrowContainer}>
            <IoIosArrowForward
              className={styles.arrow}
              onClick={() => handleArrow('r')}
            />
          </div>
        )}
      </div>
      <div className={styles.indexesContainer}>
        {images
          ? images.map((image, i) => {
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
            })
          : ''}
      </div>
    </div>
  );
};

export default Featured;
