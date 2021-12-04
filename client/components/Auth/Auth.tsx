import FacebookLogin from "react-facebook-login";
import Input from "../Share/Input/Input";
import PrimaryBtn from "../Share/PrimaryBtn/PrimaryBtn";
import styles from "./Auth.module.scss";

const Auth = () => {
  const responseFacebook = (response) => {
    console.log("Hiii.");
    console.log(response);
  };

  return (
    <div className={styles.container}>
      <div className={styles.auth}>
        <img
          className={styles.img}
          src="https://c8.alamy.com/comp/2EYAJFR/laughing-man-with-phone-chatting-with-his-friends-cartoon-vector-illustration-2EYAJFR.jpg"
        />
        <div className={styles.form}>
          <h4 className={styles.formHeader}>
            Join our community to keep in touch with your friends and loved
            ones.
          </h4>
          <form className={styles.formField}>
            <Input placeholder="Username" name="username" type="text" />
            <Input placeholder="Email" name="email" type="text" />
            <Input placeholder="Password" name="password" type="password" />
            <PrimaryBtn>Sign Up</PrimaryBtn>
            <div className={styles.alternative}>
              <span className={styles.alternativeText}>Or</span>
            </div>
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_APP_ID}
              autoLoad={true}
              fields="name,email,picture"
              callback={responseFacebook}
              cssClass={styles.fbBtn}
              icon="fa-facebook"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
