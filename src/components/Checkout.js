import React, { useContext } from "react";
import styles from "./Checkout.module.css";
import Subtotal from "./Subtotal";
import { StateContext } from "../store/StateProvider";
import CheckoutProduct from "./CheckoutProduct";

const Checkout = () => {
  const [{ basket }, dispatchAction] = useContext(StateContext);

  return (
    <div className={styles.checkout}>
      <div className={styles.checkout__left}>
        <img
          className={styles.checkout__ad}
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="ad_image"
        />

        <div>
          <h2 className={styles.checkout__title}>Your Shopping Basket</h2>
        </div>

        {/* Basket Item  */}
        {basket.map((item) => (
          <CheckoutProduct
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
            rating={item.rating}
          />
        ))}
      </div>

      <div className={styles.checkout__right}>
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
