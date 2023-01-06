import React, { useContext } from "react";
import styles from "./Product.module.css";
import { StateContext } from "../store/StateProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { grey } from "@mui/material/colors";

const Product = ({ id, title, price, image, rating }) => {
  const [appData, dispatchAction] = useContext(StateContext);

  const productInfo = (
    <div style={{ display: "flex" }}>
      <img
        src={image}
        style={{ objectFit: "contain", height: "50px", width: "50px" }}
        alt="book_name"
      />
      <div style={{ marginLeft: "15px" }}>
        <h4>Product added to cart</h4>
        <h6>{title}</h6>
      </div>
    </div>
  );

  const notify = () => {
    toast(productInfo, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const addToBasketHandler = () => {
    // add item into application wide state object
    dispatchAction({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
    notify();
  };

  return (
    <div className={styles.product}>
      <div className={styles.product__info}>
        <p>{title}</p>
        <p className={styles.product__price}>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className={styles.product__rating}>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt="book_name" />
      <div className={styles.addButton}>
        <button onClick={addToBasketHandler}>Add to Basket</button>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};

export default Product;
