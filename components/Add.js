import React, { useState } from 'react';
import styles from '../styles/Add.module.css';
import axios from 'axios';

const Add = ({ setClose, pizzaList, setPizzaList }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([0, 0, 0]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);

  const [error, setError] = useState([false, '']);
  const [errorExtra, setErrorExtra] = useState([false, '']);

  const handleExtraInput = (e) => {
    setError([false, '']);
    setErrorExtra([false, '']);
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    if (extra == null) {
      return setErrorExtra([true, 'Please fill Text and Price']);
    }

    if (extra.price && extra.text) {
      document.getElementById('price').value = '';
      document.getElementById('text').value = '';

      // Spread previous array and push the new extra
      setExtraOptions((prev) => [...prev, extra]);
      setExtra(null);
    } else {
      return setErrorExtra([true, 'Please fill Text and Price']);
    }
  };

  const changePrice = (e, index) => {
    // Find current prices THEN update them
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleCreate = async () => {
    if (!file || !title || !desc || !prices) {
      setError([true, 'Please fill all highlighted fields']);
    } else {
      // For cloud hosting
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'uploads');

      try {
        // The post method to upload an image to Cloudinary
        const uploadRes = await axios.post(
          // csabbah is our Cloud name (Can be found in the Cloudinary/Dashboard)
          'https://api.cloudinary.com/v1_1/csabbah/image/upload',
          data
        );

        // Extract the cloud link (that was generated above)
        const { url } = uploadRes.data;

        const newProduct = {
          title,
          desc,
          prices,
          extraOptions,
          img: url,
        };

        const res = await axios.post(
          `http://localhost:3000/api/products`,
          newProduct
        );

        setPizzaList([
          // Push the the updated data
          res.data,
          // Keep the existing data but delete the previous version of the order we just modified
          ...pizzaList.filter((order) => order._id !== res.data._id),
        ]);

        setClose(true);
        // Reload current page
        // Router.reload(window.location.pathname);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const clickOutside = (e) => {
    if (e == 'Add_container__nehfK') {
      setClose(true);
    }
  };

  return (
    <div
      onClick={(e) => clickOutside(e.target.className)}
      className={styles.container}
    >
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1>Add a new Pizza</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input
            style={{ color: error[0] ? 'red' : '' }}
            type="file"
            onChange={(e) => {
              setError([false, '']);
              setErrorExtra([false, '']);
              setFile(e.target.files[0]);
            }}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            style={{ border: error[0] ? '2px solid red' : '' }}
            onChange={(e) => {
              setError([false, '']);
              setErrorExtra([false, '']);
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Description</label>
          <textarea
            style={{ border: error[0] ? '2px solid red' : '' }}
            className={styles.textarea}
            rows={4}
            type="text"
            onChange={(e) => {
              setError([false, '']);
              setErrorExtra([false, '']);
              setDesc(e.target.value);
            }}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              style={{ borderBottom: error[0] ? '2px solid red' : '' }}
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Small"
              onChange={(e) => {
                setError([false, '']);
                setErrorExtra([false, '']);
                changePrice(e, 0);
              }}
            />
            <input
              style={{ borderBottom: error[0] ? '2px solid red' : '' }}
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => {
                setError([false, '']);
                setErrorExtra([false, '']);
                changePrice(e, 1);
              }}
            />
            <input
              style={{ borderBottom: error[0] ? '2px solid red' : '' }}
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              onChange={(e) => {
                setError([false, '']);
                setErrorExtra([false, '']);
                changePrice(e, 2);
              }}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              id="text"
              style={{ borderBottom: errorExtra[0] ? '2px solid red' : '' }}
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Item"
              name="text"
              onChange={(e) => handleExtraInput(e)}
            />
            <input
              id="price"
              style={{ borderBottom: errorExtra[0] ? '2px solid red' : '' }}
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Price"
              name="price"
              onChange={(e) => handleExtraInput(e)}
            />
            <button
              className={styles.extraButton}
              onClick={() => handleExtra()}
            >
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={() => handleCreate()}>
          Create
        </button>
        {errorExtra[0] && <p style={{ color: 'red' }}>{errorExtra[1]}</p>}
        {error[0] && <p style={{ color: 'red' }}>{error[1]}</p>}
      </div>
    </div>
  );
};

export default Add;

export const getServerSideProps = async () => {
  const products = await axios.get(`http://localhost:3000/api/products`);

  return {
    props: {
      products: products.data,
    },
  };
};
