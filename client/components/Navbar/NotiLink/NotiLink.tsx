import styles from "./NotiLink.module.scss";

import { useState } from "react";
import Notifications from "../../Notifications/Notifications";
import { NavigateNavLink } from "../NavLinks/NavLinks";
import { IoIosNotificationsOutline } from "react-icons/io";

export const NotiLink = () => {
  const { innerWidth } = window;
  const [showNotis, setShowNotis] = useState(false);

  return innerWidth < 600 ? (
    <NavigateNavLink
      href={`/notifications`}
      icon={<IoIosNotificationsOutline />}
    />
  ) : (
    <div className={styles.notiContainer}>
      <li onClick={() => setShowNotis(true)} className={styles.navLink}>
        <IoIosNotificationsOutline />
      </li>
      {showNotis && (
        <div className={styles.notis}>
          <Notifications />
        </div>
      )}
    </div>
  );
};
export default NotiLink;
