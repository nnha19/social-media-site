import styles from "./Input.module.scss";
import { useForm } from "react-hook-form";
interface IProps {
  name: string;
  placeholder?: string;
  label?: string;
  type: string;
  validRules?: object;
  register: any;
  errors: any;
  errorMsg;
}

const Input: React.FC<IProps> = ({
  name,
  placeholder,
  label,
  type,
  validRules,
  register,
  errors,
  errorMsg,
}) => {
  return (
    <div className={styles.input}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        {...register(name, validRules)}
        className={styles.inputField}
        type={type}
        placeholder={placeholder}
      />
      {errors[name] && <span className={styles.inputError}>{errorMsg}</span>}
    </div>
  );
};

export default Input;
