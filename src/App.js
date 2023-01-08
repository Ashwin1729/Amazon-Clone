import React, { useEffect, useContext } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import { StateContext } from "./store/StateProvider";
import { auth } from "./firebase";
import Payment from "./components/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51MNqeCSHaCvRvJ1rTlh5OdekImjl9vrb2QhswQjovr9HBYsyDJ9CFvFMUO92LM5TTW8jIItBUotbw4EI51nqssO900Q8XA22rv"
);

function App() {
  const [appData, dispatchAction] = useContext(StateContext);

  // const options = {
  //   clientSecret:
  //     "{{sk_test_51MNqeCSHaCvRvJ1rLIaTcuYnuUQfb8JZ21LusrYWEl84H1XE4VvV133ilvA8p5TP7JBWzePs5mWpzHXE6Tw9XXuy00JGZ9HMuZ}}",
  // };

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("the user is >>>", authUser);

      if (authUser) {
        dispatchAction({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatchAction({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatchAction]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/checkout"
            element={
              <div>
                <Header />
                <Checkout />
              </div>
            }
          />
          <Route
            exact
            path="/checkout/payment"
            element={
              <div>
                <Header />
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </div>
            }
          />
          <Route
            exact
            path="/"
            element={
              <div>
                <Header />
                <Home />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
