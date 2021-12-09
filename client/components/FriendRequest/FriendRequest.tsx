import styles from "./FriendRequest.module.scss";
import axios from "axios";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import PrimaryBtn from "../Share/PrimaryBtn/PrimaryBtn";
import { IUserFriReqs } from "../Users/Users";
import Spinner from "../Share/Spinner/Spinner";

interface IProps {
  recipentId: string;
  curUserFriReqs: IUserFriReqs;
  setCurUserFriReqs: React.Dispatch<React.SetStateAction<IUserFriReqs>>;
}

const FriendRequest: React.FC<IProps> = ({
  recipentId,
  curUserFriReqs,
  setCurUserFriReqs,
}) => {
  const reqAlreadySent = curUserFriReqs.sentRequests.some(
    (uid) => uid === recipentId
  );
  const [friReqLoading, setFriReqLoading] = useState(false);

  const handleFriRequest = async (
    uid: string,
    rid: string,
    alreadySent: boolean
  ) => {
    try {
      setFriReqLoading(true);
      const resp = await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${uid}/request/${rid}`,
        method: alreadySent ? "DELETE" : "POST",
      });
      setCurUserFriReqs(resp.data);
      setFriReqLoading(false);
    } catch (err) {
      setFriReqLoading(false);
    }
  };

  const { user } = useAppSelector((state) => state.user);

  let innterText: string | JSX.Element;
  if (!friReqLoading) {
    innterText = !reqAlreadySent ? "Add Friend" : "Requested";
  } else {
    innterText = <Spinner className={styles.spinner} />;
  }

  return (
    <PrimaryBtn
      className={reqAlreadySent && styles.requested}
      onClick={() => {
        handleFriRequest(user._id, recipentId, reqAlreadySent);
      }}
    >
      {innterText}
    </PrimaryBtn>
  );
};

export default FriendRequest;
