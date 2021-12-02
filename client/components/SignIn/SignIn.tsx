import React from "react";
import Input from "../Share/Input/Input";
import PrimaryBtn from "../Share/PrimaryBtn/PrimaryBtn";

import styles from "./SignIn.module.scss";

const Signin = () => {
  return (
    <div className={styles.auth}>
      <div className={styles.authImgContainer}>
        <img
          className={styles.authImg}
          src="https://image.shutterstock.com/image-vector/two-girls-texting-on-mobile-260nw-1836644311.jpg"
        />
      </div>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h4 className={styles.formHeader}>
            Join our community to keep in touch with your firends and love ones.
          </h4>
          <form className={styles.form}>
            <Input placeholder="Username" type="text" name="username" />
            <Input placeholder="Email" type="email" name="email" />
            <Input placeholder="Password" type="password" name="password" />
            <PrimaryBtn>Sign Up</PrimaryBtn>
          </form>
          <div className={styles.alternative}>
            <span className={styles.alternativeLine}>Or</span>
          </div>
          <div className={styles.facebook}>
            <PrimaryBtn style={{ marginTop: "2rem", background: "blue" }}>
              Sign Up with Google
            </PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
