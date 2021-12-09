import React from "react";
import styles from "./Dropdown.module.scss";
interface IProps {
  children: React.ReactNode;
}

const Dropdown: React.FC<IProps> = ({ children }) => {
  return <div className={styles.dropdown}>{children}</div>;
};

export default Dropdown;
