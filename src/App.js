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

function App() {
  const [appData, dispatchAction] = useContext(StateContext);

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
                <Payment />
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
