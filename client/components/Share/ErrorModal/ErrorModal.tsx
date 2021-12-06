import styles from "./ErrorModal.module.scss";

import Modal from "../Modal/Modal";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";

interface IProps {
  closeModal: () => void;
  error: string;
}

const ErrorModal: React.FC<IProps> = ({ closeModal, error }) => {
  return (
    <Modal
      closeModal={closeModal}
      title={"Error Occured"}
      body={
        <>
          <p className={styles.modalText}>{error}</p>
          <div className={styles.modalBtn}>
            <PrimaryBtn onClick={closeModal}>Dismiss</PrimaryBtn>
          </div>
        </>
      }
    />
  );
};

export default ErrorModal;
