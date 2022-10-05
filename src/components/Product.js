import React from "react";
import styles from "./Product.module.css";

const Product = () => {
  return (
    <div className={styles.product}>
      <div className={styles.product__info}>
        <p>The learn startup</p>
        <p className={styles.product__price}>
          <small>$</small>
          <strong>19.99</strong>
        </p>
        <div className={styles.product__rating}>
          <p>⭐</p>
        </div>
      </div>
      <img
        src="https://m.media-amazon.com/images/I/51CTIr1bJxL._AC_SS250_.jpg"
        alt="book_name"
      />
      <button>Add to Basket</button>
    </div>
  );
};

export default Product;
