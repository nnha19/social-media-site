import React from "react";

import styles from "./PrimaryBtn.module.scss";

interface IProps {
  children: React.ReactNode;
  className?: string;
  style?: object;
  onClick?: () => void;
}

const PrimaryBtn: React.FC<IProps> = ({
  children,
  className,
  style,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      style={style}
      className={`${styles.btn} ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn;
