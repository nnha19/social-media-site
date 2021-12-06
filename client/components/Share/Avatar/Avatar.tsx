import { useAppSelector } from "../../../app/hooks";
import styles from "./Avatar.module.scss";
const Avatar = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className={styles.avatar}>
      <img src={user.profilePicture} />
      <h4>{user.username}</h4>
    </div>
  );
};

export default Avatar;
