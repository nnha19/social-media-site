import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { IUsers } from "../../types/types";
import PrimaryBtn from "../Share/PrimaryBtn/PrimaryBtn";
import styles from "./Users.module.scss";

const Users = () => {
  const { user } = useAppSelector((state) => state.user);
  const [allUsers, setAllUsers] = useState<IUsers["users"]>();
  const [curUserFriReqs, setCurUserFriReqs] = useState();
  useEffect(() => {
    (async () => {
      const resp = await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
        method: "GET",
      });
      setAllUsers(resp.data);
    })();
  }, [user]);

  const usersList =
    allUsers?.length > 0 &&
    allUsers.map((u) => {
      return (
        <div className={styles.user}>
          <img
            className={styles.userImg}
            src={`https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80`}
          />
          <div className={styles.userInfo}>
            <h2 className={styles.userName}>{u.username}</h2>
            <div className={styles.userBtns}>
              <PrimaryBtn>Add Friend</PrimaryBtn>
              <PrimaryBtn>Remove</PrimaryBtn>
            </div>
          </div>
        </div>
      );
    });

  return <div className={styles.users}>{usersList}</div>;
};

export default Users;
