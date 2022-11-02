import React from "react";
import styles from "./Subtotal.module.css";
import CurrencyFormat from "react-currency-format";

const Subtotal = () => {
  return (
    <div className={styles.subtotal}>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal (0 items) : <strong>0</strong>
            </p>
            <small className={styles.subtotal__gift}>
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={0}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button>Proceed to Checkout</button>
    </div>
  );
};

export default Subtotal;
