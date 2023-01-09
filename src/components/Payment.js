import React, { useContext, useState, useEffect } from "react";
import axios from "./axios";
import { Link, useNavigate } from "react-router-dom";
import { StateContext } from "../store/StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import FlipMove from "react-flip-move";
import styles from "./Payment.module.css";
import CurrencyFormat from "react-currency-format";
import { db } from "../firebase";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Payment = () => {
  const [appData, dispatchAction] = useContext(StateContext);

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // generate special client secret for client payment processing
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // stripe expects the total in a currencies subunits
        url: `/payments/create?total=${
          clacTotalAmount(appData.basket, "price") * 100
        }`,
      });

      setClientSecret(response.data.clientSecret);
      console.log("Client Secret", response.data);
    };

    getClientSecret();
  }, [appData.basket]);

  const clacTotalAmount = (items, prop) => {
    return items.reduce((acc, curr) => acc + curr[prop], 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    const response = payload.paymentIntent;
    console.log(response);

    if (response) {
      setSucceeded(true);
      setError(null);
      setProcessing(false);
      console.log("perfect");

      // add Items to database
      db.collection("users")
        .doc(appData.user?.uid)
        .collection("orders")
        .doc(response.id)
        .set({
          basket: appData.basket,
          amount: response.amount,
          created: response.created,
        });
    }

    dispatchAction({
      type: "EMPTY_BASKET",
    });

    navigate("/orders", { replace: true });
  };

  const elementChangeHandler = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

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
          <div className={styles.payment__details}>
            {/* Stripe Magic */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={elementChangeHandler} />
              <div className={styles.payment__priceContainer}>
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <div>
                        ................................................
                      </div>
                      <h4>Order Total: {value}</h4>
                    </>
                  )}
                  decimalScale={2}
                  value={clacTotalAmount(appData.basket, "price")}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>

                {/* Errors */}
                {error && <div>{error}</div>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
