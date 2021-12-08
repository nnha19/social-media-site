import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { IUsers } from "../../types/types";
import PrimaryBtn from "../Share/PrimaryBtn/PrimaryBtn";
import styles from "./Users.module.scss";

interface IUserFriReqs {
  userId: string;
  friendRequests: string[];
  sentRequests: string[];
}

const Users = () => {
  const { user } = useAppSelector((state) => state.user);
  const [allUsers, setAllUsers] = useState<IUsers["users"]>();
  const [curUserFriReqs, setCurUserFriReqs] = useState<IUserFriReqs>();
  const [loading, setLoading] = useState(false);
  const [secLoading, setSecLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const resp = await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user._id}/request`,
      });
      setCurUserFriReqs(resp.data);
      setLoading(false);
    })();
  }, [user]);

  useEffect(() => {
    setSecLoading(true);
    (async () => {
      const resp = await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
        method: "GET",
      });
      setAllUsers(resp.data);
    })();
    setSecLoading(false);
  }, [user]);

  const handleAddFriend = async (uid: string, rid: string) => {
    const resp = await axios({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${uid}/request/${rid}`,
      method: "POST",
    });
    console.log(resp.data);
  };

  const usersList =
    allUsers?.length > 0 &&
    !loading &&
    !secLoading &&
    allUsers.map((u) => {
      const reqAlreadySent = curUserFriReqs.sentRequests.some(
        (uid) => uid === u._id
      );
      return (
        <div className={styles.user}>
          <img
            className={styles.userImg}
            src={`https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80`}
          />
          <div className={styles.userInfo}>
            <h2 className={styles.userName}>{u.username}</h2>
            <div className={styles.userBtns}>
              <PrimaryBtn onClick={() => handleAddFriend(user._id, u._id)}>
                {!reqAlreadySent ? "Add Friend" : "Pending..."}
              </PrimaryBtn>
              <PrimaryBtn>Remove</PrimaryBtn>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className={styles.users}>
      {loading || secLoading ? "Loading..." : usersList}
    </div>
  );
};

export default Users;
