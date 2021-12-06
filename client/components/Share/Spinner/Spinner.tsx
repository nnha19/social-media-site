import BackDrop from "../BackDrop/BackDrop";
import styles from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.container}>
      <span className={styles.spinner}></span>
    </div>
  );
};

export const SpinnerWithBackDrop = () => {
  return (
    <div className={styles.container}>
      <BackDrop />
      <span className={styles.spinner}></span>
    </div>
  );
};
export default Spinner;
