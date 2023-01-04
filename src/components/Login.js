import React from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const registerHandler = () => {};

  return (
    <div className={styles.login}>
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="Amazon_logo"
          className={styles.login__logo}
        />
      </Link>

      <div className={styles.login__container}>
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input type="text" />

          <h5>Password</h5>
          <input type="password" />

          <button className={styles.login__signInButton}>Sign In</button>
        </form>

        <p>
          By signing-in you agree to the AMAZON CLONE Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button
          onClick={registerHandler}
          className={styles.login__registerButton}
        >
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
};

export default Login;
