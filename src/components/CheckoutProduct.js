import React from "react";
import styles from "./CheckoutProduct.module.css";

const CheckoutProduct = ({ id, image, title, price, rating }) => {
  const removeFromBasketHandler = () => {};

  return (
    <div className={styles.checkoutProduct}>
      <img
        className={styles.checkoutProduct__image}
        src={image}
        alt="product_image"
      />

      <div className={styles.checkoutProduct__info}>
        <p className={styles.checkoutProduct__title}>{title}</p>
        <p className={styles.checkoutProduct__price}>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className={styles.checkoutProduct__rating}>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        <button onClick={removeFromBasketHandler}>Remove from Basket</button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
