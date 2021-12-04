import FacebookLogin from "react-facebook-login";
import Input from "../Share/Input/Input";
import PrimaryBtn from "../Share/PrimaryBtn/PrimaryBtn";
import { useRouter } from "next/router";
import styles from "./Auth.module.scss";

interface IProps {
  authMode: "signin" | "signup";
}

const Auth: React.FC<IProps> = ({ authMode }) => {
  const router = useRouter();
  const responseFacebook = (response) => {};

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
            {authMode === "signup" && (
              <Input placeholder="Username" name="username" type="text" />
            )}
            <Input placeholder="Email" name="email" type="text" />
            <Input placeholder="Password" name="password" type="password" />
            <PrimaryBtn>
              {authMode === "signup" ? "Sign Up" : "Sign In"}
            </PrimaryBtn>
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
          {authMode === "signup" && (
            <p className={styles.formChangeMode}>
              Already a member?
              <span onClick={() => router.push("/signin")}>Sign In</span>
            </p>
          )}
          {authMode === "signin" && (
            <p className={styles.formChangeMode}>
              Don't have an account yet?
              <span
                onClick={() =>
                  router.push(`${authMode === "signin" ? "signup" : "signin"}`)
                }
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
