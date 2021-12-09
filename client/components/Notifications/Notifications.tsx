import React, { useState } from "react";
import PrimaryBtn from "../Share/PrimaryBtn/PrimaryBtn";
import styles from "./Notifications.module.scss";

const Notifications = () => {
  const [notifications, setNotifications] = useState();

  const notisList = notifications.map((noti) => {
    let response: JSX.Element;
    if (noti.type === "friend request") {
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
            <strong>{noti.username}</strong> {noti.action}
            <p className={styles.notiDate}>{noti.date}</p>
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
