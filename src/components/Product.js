import React, { useContext } from "react";
import styles from "./Product.module.css";
import { StateContext } from "../store/StateProvider";

const Product = ({ id, title, price, image, rating }) => {
  const [appData, dispatchAction] = useContext(StateContext);

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
      <button onClick={addToBasketHandler}>Add to Basket</button>
    </div>
  );
};

export default Product;
