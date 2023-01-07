import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../store/StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import FlipMove from "react-flip-move";
import styles from "./Payment.module.css";

const Payment = () => {
  const [appData, dispatchAction] = useContext(StateContext);

  return (
    <div className={styles.payment}>
      <div className={styles.payment__container}>
        <h1>
          Checkout (<Link to="/checkout">{appData.basket?.length} items</Link>)
        </h1>

        {/* Address */}
        <div className={styles.payment__section}>
          <div className={styles.payment__title}>
            <h3>Delivery Address</h3>
          </div>
          <div className={styles.payment__address}>
            <p>{appData.user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Review Items */}
        <div className={styles.payment__section}>
          <div className={styles.payment__title}>
            <h3>Review items and delivery</h3>
          </div>
          <div className={styles.payment__items}>
            <FlipMove duration={800} delay={100} easing="ease-out">
              {appData.basket.map((item) => (
                <CheckoutProduct
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  rating={item.rating}
                />
              ))}
            </FlipMove>
          </div>
        </div>

        {/* Payment Method */}
        <div className={styles.payment__section}>
          <div className={styles.payment__title}>
            <h3>Payment Method</h3>
          </div>
          <div className={styles.payment__details}>{/* Stripe Magic */}</div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
