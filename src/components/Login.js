import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const signInHandler = async (event) => {
    event.preventDefault();

    // login

    try {
      const response = await auth.signInWithEmailAndPassword(email, password);
      if (response) {
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const registerHandler = async (event) => {
    event.preventDefault();

    // register
    try {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);

      if (response) {
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

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
          <input type="text" value={email} onChange={emailChangeHandler} />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={passwordChangeHandler}
          />

          <button
            type="submit"
            className={styles.login__signInButton}
            onClick={signInHandler}
          >
            Sign In
          </button>
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
