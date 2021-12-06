import styles from "./Navbar.module.scss";
import { AiOutlineHome } from "react-icons/ai";
import { RiMessengerLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useAppSelector } from "../../app/hooks";
import Link from "next/link";
import Avatar from "../Share/Avatar/Avatar";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.user);

  const router = useRouter();
  useEffect(() => {
    if (!user.token) router.push(`/signup`);
  }, [user]);

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <h1>Logo</h1>
      </div>
      {user && user.token && (
        <ul className={styles.navLinks}>
          <Link href="/posts">
            <li className={styles.navLink}>
              <AiOutlineHome />
            </li>
          </Link>
          <Link href="/messenger">
            <li className={styles.navLink}>
              <RiMessengerLine />
            </li>
          </Link>
          <Link href="/notifications">
            <li className={styles.navLink}>
              <IoIosNotificationsOutline />
            </li>
          </Link>
          <Link href={`/profile/${user._id}`}>
            <li>
              <Avatar />
            </li>
          </Link>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
