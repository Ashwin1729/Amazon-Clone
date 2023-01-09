import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { StateContext } from "../store/StateProvider";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { auth } from "../firebase";

const Header = () => {
  const [appData, dispatchAction] = useContext(StateContext);

  const authHandler = () => {
    if (appData.user) {
      auth.signOut();
    }
  };

  return (
    <div className={styles.header}>
      <Link to="/">
        <img
          className={styles.header__logo}
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon-logo"
        />
      </Link>
      <div className={styles.header__search}>
        <input className={styles.header__searchInput} type="text" />
        <SearchIcon className={styles.header__searchIcon} />
      </div>
      <div className={styles.header__nav}>
        <Link to={!appData.user && "/login"}>
          <div className={styles.header__option} onClick={authHandler}>
            <span className={styles.header__optionLineOne}>
              Hello {!appData.user ? "Guest" : appData.user?.email}
            </span>
            <span className={styles.header__optionLineTwo}>
              {appData.user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to="/orders">
          <div className={styles.header__option}>
            <span className={styles.header__optionLineOne}>Returns</span>
            <span className={styles.header__optionLineTwo}>& Orders</span>
          </div>
        </Link>
        <div className={styles.header__option}>
          <span className={styles.header__optionLineOne}>Your</span>
          <span className={styles.header__optionLineTwo}>Prime</span>
        </div>
        <Link to="/checkout">
          <div className={styles.header__optionBasket}>
            <ShoppingBasketIcon />
            <span
              className={`${styles.header__optionLineTwo} ${styles.header__basketCount}`}
            >
              {appData.basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
