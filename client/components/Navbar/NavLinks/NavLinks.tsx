import styles from "./NavLinks.module.scss";

import { AiOutlineHome } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { RiMessengerLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import Link from "next/link";
import { useAppSelector } from "../../../app/hooks";
import Avatar from "../../Share/Avatar/Avatar";
import { useRouter } from "next/router";
import { useState } from "react";
import Users from "../../Users/Users";

interface IProps {
  href: string;
  icon: JSX.Element;
}

const NavigateNavLink: React.FC<IProps> = ({ href, icon }) => {
  const { pathname } = useRouter();
  let navLinkStyle = styles.navLink;
  if (pathname === href) {
    navLinkStyle = `${navLinkStyle} ${styles.activeNavLink}`;
  }
  return (
    <Link href={href}>
      <li className={navLinkStyle}>{icon}</li>
    </Link>
  );
};

export const PostsLink = () => {
  return <NavigateNavLink href="/posts" icon={<AiOutlineHome />} />;
};

export const MessengerLink = () => {
  return <NavigateNavLink href="/messenger" icon={<RiMessengerLine />} />;
};

export const UsersLink = () => {
  const [showUserDropdown, setShowUserDropDown] = useState(false);
  const handleToggleDropdown = () => {
    setShowUserDropDown(!showUserDropdown);
  };

  const { innerWidth } = window;
  return innerWidth < 600 ? (
    <NavigateNavLink href={`/users`} icon={<FiUsers />} />
  ) : (
    <div className={styles.usersContainer}>
      <li onClick={handleToggleDropdown} className={styles.navLink}>
        <FiUsers />
      </li>
      {showUserDropdown && <Users />}
    </div>
  );
};

export const NotiLink = () => {
  const { innerWidth } = window;

  return innerWidth < 600 ? (
    <NavigateNavLink
      href={`/notifications`}
      icon={<IoIosNotificationsOutline />}
    />
  ) : (
    <li className={styles.navLink}>
      <IoIosNotificationsOutline />
    </li>
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
