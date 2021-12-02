import styles from "./Input.module.scss";

interface IProps {
  placeholder: string;
  label?: string;
  type: string;
  name: string;
}

const Input: React.FC<IProps> = ({ placeholder, label, type, name }) => {
  return (
    <div className={styles.inputContainer}>
      <input className={styles.input} type={type} placeholder={placeholder} />
    </div>
  );
};

export default Input;
