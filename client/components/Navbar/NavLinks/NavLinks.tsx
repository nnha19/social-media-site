import styles from "./NavLinks.module.scss";

import { AiOutlineHome } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { RiMessengerLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import Link from "next/link";
import { useAppSelector } from "../../../app/hooks";
import Avatar from "../../Share/Avatar/Avatar";

export const PostsLink = () => {
  return (
    <Link href="/posts">
      <li className={styles.navLink}>
        <AiOutlineHome />
      </li>
    </Link>
  );
};

export const MessengerLink = () => {
  const navLinkStyle = `${styles.activeNavLink} ${styles.navLink}`;
  return (
    <Link href="/messenger">
      <li className={navLinkStyle}>
        <RiMessengerLine />
      </li>
    </Link>
  );
};

export const UsersLink = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <Link href={`/profile/${user._id}`}>
      <li className={styles.navLink}>
        <FiUsers />
      </li>
    </Link>
  );
};

export const NotiLink = () => {
  return (
    <Link href="/notifications">
      <li className={styles.navLink}>
        <IoIosNotificationsOutline />
      </li>
    </Link>
  );
};

export const ProfileLink = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <Link href={`/profile/${user._id}`}>
      <li className={styles.profileNav}>
        <Avatar />
        <h4>{user.username}</h4>
      </li>
    </Link>
  );
};
