import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { IUsers } from "../../types/types";
import FriendRequest from "../FriendRequest/FriendRequest";
import PrimaryBtn from "../Share/PrimaryBtn/PrimaryBtn";
import styles from "./Users.module.scss";

export interface IUserFriReqs {
  userId: string;
  friendRequests: string[];
  sentRequests: string[];
}

const Users = () => {
  const router = useRouter();
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

  // const handleFriRequest = async (
  //   uid: string,
  //   rid: string,
  //   alreadySent: boolean
  // ) => {
  //   console.log(alreadySent);
  //   try {
  //     setFriReqLoading(true);
  //     const resp = await axios({
  //       url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${uid}/request/${rid}`,
  //       method: alreadySent ? "DELETE" : "POST",
  //     });
  //     setFriReqLoading(false);
  //   } catch (err) {
  //     setFriReqLoading(false);
  //   }
  // };

  const usersList =
    allUsers?.length > 0 &&
    !loading &&
    !secLoading &&
    allUsers.map((u) => {
      const handleNavigate = () => {
        router.push(`/profile/${u._id}`);
      };

      return (
        <div className={styles.user}>
          <img
            onClick={handleNavigate}
            className={styles.userImg}
            src={`https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80`}
          />
          <div className={styles.userInfo}>
            <h2 onClick={handleNavigate} className={styles.userName}>
              {u.username}
            </h2>
            <div className={styles.userBtns}>
              <FriendRequest
                setCurUserFriReqs={setCurUserFriReqs}
                recipentId={u._id}
                curUserFriReqs={curUserFriReqs}
              />
              <PrimaryBtn>Remove</PrimaryBtn>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div>
      <h2 className={styles.usersHeader}>Send Friend Requests</h2>
      {loading || secLoading ? "Loading..." : usersList}
    </div>
  );
};

export default Users;
