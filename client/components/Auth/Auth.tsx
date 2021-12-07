import FacebookLogin from "react-facebook-login";
import Input from "../Share/Input/Input";
import PrimaryBtn from "../Share/PrimaryBtn/PrimaryBtn";
import { useRouter } from "next/router";
import styles from "./Auth.module.scss";
import { useForm } from "react-hook-form";
import { SpinnerWithBackDrop } from "../Share/Spinner/Spinner";
import ErrorModal from "../Share/ErrorModal/ErrorModal";
import { IUser } from "../../types/types";
import { signUpAsyncThunk } from "../../features/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { cancelError } from "../../features/userSlice";

interface IProps {
  authMode: "signin" | "signup";
}
const Auth: React.FC<IProps> = ({ authMode }) => {
  const { loading, error, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = (data: IUser) => {
    dispatch(signUpAsyncThunk({ authMode, data }));
  };

  const responseFacebook = (response) => {
    const {
      accessToken,
      email,
      name: username,
      picture: {
        data: { url: profilePicture },
      },
    } = response;
    const data = { email, username, profilePicture };
    dispatch(signUpAsyncThunk({ authMode: "facebook/auth", data }));
  };

  // useEffect(() => {
  //   if (!user || !user.token) return;
  //   localStorage.setItem("token", user.token);
  //   router.push("/");
  // }, [user]);

  return (
    <div className={styles.container}>
      {loading && <SpinnerWithBackDrop />}
      {error && (
        <ErrorModal
          error={error}
          closeModal={() => dispatch(cancelError({}))}
        />
      )}
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
          <form onSubmit={handleSubmit(onSubmit)} className={styles.formField}>
            {authMode === "signup" && (
              <Input
                register={register}
                errors={errors}
                placeholder="Username"
                name="username"
                type="text"
                errorMsg="This field is required"
                validRules={{ required: true }}
              />
            )}
            <Input
              register={register}
              errors={errors}
              validRules={{
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              }}
              placeholder="Email"
              type="text"
              name="email"
              errorMsg="Email must be valid"
            />
            <Input
              register={register}
              errors={errors}
              placeholder="Password"
              name="password"
              type="password"
              validRules={{ required: true }}
              errorMsg="This field is required"
            />
            <PrimaryBtn>
              {authMode === "signup" ? "Sign Up" : "Sign In"}
            </PrimaryBtn>
            <div className={styles.alternative}>
              <span className={styles.alternativeText}>Or</span>
            </div>
            <FacebookLogin
              appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
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
