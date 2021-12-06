import BackDrop from "../BackDrop/BackDrop";
import styles from "./Modal.module.scss";

interface IProps {
  title: string;
  body: JSX.Element;
  closeModal: () => void;
}

const Modal: React.FC<IProps> = ({ title, body, closeModal }) => {
  return (
    <div>
      <BackDrop onClick={closeModal} />
      <div className={styles.modal}>
        <h2 className={styles.modalHeader}>{title}</h2>
        <div className={styles.modalBody}>{body}</div>
      </div>
    </div>
  );
};

export default Modal;
