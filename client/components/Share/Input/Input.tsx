import styles from "./Input.module.scss";

interface IProps {
  name: string;
  placeholder?: string;
  label?: string;
  type: string;
}

const Input: React.FC<IProps> = ({ name, placeholder, label, type }) => {
  return (
    <div className={styles.input}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        className={styles.inputField}
        type={type}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};

export default Input;
