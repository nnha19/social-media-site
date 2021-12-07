import { useAppSelector } from "../../../app/hooks";
import styles from "./Avatar.module.scss";

interface IProps {
  className?: string;
  style?: object;
}

const Avatar: React.FC<IProps> = ({ className, style }) => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div style={style} className={`${styles.avatar} ${className}`}>
      <img src={user.profilePicture} />
    </div>
  );
};

export default Avatar;
