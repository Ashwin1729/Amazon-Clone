import React from "react";
import styles from "./Home.module.css";
import Product from "./Product";

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.home__container}>
        <img
          className={styles.home__image}
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt="amazon_banner"
        />

        <div className={styles.home__row}>
          <Product />
          <Product />
          <Product />
        </div>
      </div>
    </div>
  );
};

export default Home;
