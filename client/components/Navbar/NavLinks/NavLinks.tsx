import styles from "./NavLinks.module.scss";

import { AiOutlineHome } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { RiMessengerLine } from "react-icons/ri";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Avatar from "../../Share/Avatar/Avatar";
import { useRouter } from "next/router";
import Users from "../../Users/Users";
import { showDropdownAction } from "../../../features/dropdownsSlice";

interface IProps {
  href: string;
  icon: JSX.Element;
}

export const NavigateNavLink: React.FC<IProps> = ({ href, icon }) => {
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
  const { usersDropdown } = useAppSelector((state) => state.drodowns);

  const dispatch = useAppDispatch();
  const handleShowUsers = () => {
    dispatch(showDropdownAction({ type: "usersDropdown" }));
  };

  const { innerWidth } = window;
  return innerWidth < 600 ? (
    <NavigateNavLink href={`/users`} icon={<FiUsers />} />
  ) : (
    <div id="usersDropdown" className={styles.usersContainer}>
      <li onClick={handleShowUsers} className={styles.navLink}>
        <FiUsers />
      </li>
      {usersDropdown && (
        <div className={styles.users}>
          <Users />
        </div>
      )}
    </div>
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
