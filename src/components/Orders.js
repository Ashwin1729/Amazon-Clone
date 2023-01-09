import React, { useState, useContext, useEffect } from "react";
import { db } from "../firebase";
import { StateContext } from "../store/StateProvider";
import Item from "./Item";
import styles from "./Orders.module.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [appData, dispatchAction] = useContext(StateContext);

  console.log(appData.user);

  useEffect(() => {
    if (appData.user) {
      db.collection("users")
        .doc(appData.user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot);
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });

      console.log("first");
      console.log(appData.user?.uid);
      console.log(orders);
    } else {
      setOrders([]);
      console.log("second");
    }
  }, [appData.user]);

  return (
    <div className={styles.orders}>
      <h1>Your Orders</h1>
      <div className={styles.orders_order}>
        {orders?.map((odr) => (
          <Item order={odr} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
