import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { INotifications } from "../../types/types";
import PrimaryBtn from "../Share/PrimaryBtn/PrimaryBtn";
import styles from "./Notifications.module.scss";

const Notifications = () => {
  const { user } = useAppSelector((state) => state.user);
  const [noti, setNoti] = useState<INotifications>();
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      const resp = await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/noti/${user._id}`,
        method: "GET",
      });
      setNoti(resp.data);
    })();
  }, [user._id]);

  const notisList =
    noti?.notifications &&
    noti.notifications.map((n) => {
      let response: JSX.Element;
      if (n.type === "friend request") {
        response = (
          <div className={styles.notiResponse}>
            <PrimaryBtn className={styles.notiBtn}>Accept</PrimaryBtn>
            <PrimaryBtn className={styles.notiBtn}>Decline</PrimaryBtn>
          </div>
        );
      }

      return (
        <div className={styles.noti}>
          <img
            className={styles.notiImg}
            src="https://images.unsplash.com/photo-1496440737103-cd596325d314?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z2lybHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          />
          <div className={styles.notiInfo}>
            <p>
              <strong>{n.user.username}</strong> {n.action}
              <p className={styles.notiDate}>{n.date}</p>
              {response}
            </p>
          </div>
        </div>
      );
    });

  return (
    <div className={styles.notis}>
      <h2 className={styles.notisHeader}>Notifications</h2>
      {notisList}
    </div>
  );
};

export default Notifications;
