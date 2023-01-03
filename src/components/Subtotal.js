import React, { useContext } from "react";
import styles from "./Subtotal.module.css";
import CurrencyFormat from "react-currency-format";
import { StateContext } from "../store/StateProvider";

const Subtotal = () => {
  const [appData, dispatchAction] = useContext(StateContext);

  const clacTotalAmount = (items, prop) => {
    return items.reduce((acc, curr) => acc + curr[prop], 0);
  };

  return (
    <div className={styles.subtotal}>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({appData.basket?.length} items) :{" "}
              <strong>{value}</strong>
            </p>
            <small className={styles.subtotal__gift}>
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={clacTotalAmount(appData.basket, "price")}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button>Proceed to Checkout</button>
    </div>
  );
};

export default Subtotal;
