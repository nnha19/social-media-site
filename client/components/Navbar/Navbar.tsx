import styles from "./Navbar.module.scss";

import { useAppSelector } from "../../app/hooks";
import Link from "next/link";
import Avatar from "../Share/Avatar/Avatar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  MessengerLink,
  NotiLink,
  PostsLink,
  ProfileLink,
  UsersLink,
} from "./NavLinks/NavLinks";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.user);

  const router = useRouter();

  // useEffect(() => {
  //   if (!user.token) router.push(`/signup`);
  // }, [user]);

  return (
    <nav className={styles.nav}>
      <div className={styles.navLogo}>
        <h1>Logo</h1>
      </div>
      {user && user.token && (
        <ul className={styles.navLinks}>
          <PostsLink />
          <UsersLink />
          <MessengerLink />
          <NotiLink />
          <ProfileLink />
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
