import styles from "./BackDrop.module.scss";

interface IProps {
  onClick?: () => void;
}

const BackDrop: React.FC<IProps> = ({ onClick }) => {
  return <div onClick={onClick} className={styles.backdrop}></div>;
};
export default BackDrop;
