import React from "react";

import styles from "./PrimaryBtn.module.scss";

interface IProps {
  children: React.ReactNode;
  className?: string;
  style?: object;
}

const PrimaryBtn: React.FC<IProps> = ({ children, className, style }) => {
  return (
    <button style={style} className={`${styles.btn} ${className}`}>
      {children}
    </button>
  );
};

export default PrimaryBtn;
