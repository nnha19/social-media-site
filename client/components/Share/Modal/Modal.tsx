import BackDrop from "../BackDrop/BackDrop";
import styles from "./Modal.module.scss";

const Modal = () => {
  return (
    <div>
      <BackDrop />
      <div className={styles.modal}>
        <h2 className={styles.modalHeader}>Modal Header</h2>
      </div>
    </div>
  );
};

export default Modal;
