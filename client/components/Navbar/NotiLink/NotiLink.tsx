import styles from "./NotiLink.module.scss";

import Notifications from "../../Notifications/Notifications";
import { NavigateNavLink } from "../NavLinks/NavLinks";
import { IoIosNotificationsOutline } from "react-icons/io";
import Dropdown from "../../Share/Dropdown/Dropdown";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { showDropdownAction } from "../../../features/dropdownsSlice";

export const NotiLink = () => {
  const { innerWidth } = window;
  const { notiDropdown } = useAppSelector((state) => state.drodowns);
  const dispatch = useAppDispatch();
  return innerWidth < 600 ? (
    <NavigateNavLink
      href={`/notifications`}
      icon={<IoIosNotificationsOutline />}
    />
  ) : (
    <div className={styles.notiContainer}>
      <li
        onClick={() => dispatch(showDropdownAction({ type: "notiDropdown" }))}
        className={styles.navLink}
      >
        <IoIosNotificationsOutline />
      </li>
      {notiDropdown && (
        <Dropdown>
          <Notifications />
        </Dropdown>
      )}
    </div>
  );
};
export default NotiLink;
