import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { IUsers } from "../types/types";

export default function Home() {
  const { user } = useAppSelector((state) => state.user);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (!user._id) return;
    try {
      (async () => {
        const resp = await axios({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/friend/${user._id}`,
        });
        console.log(resp.data);
        setFriends(resp?.data?.friends);
      })();
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  const handleUnfriend = async (user2) => {
    console.log(user2);
    const resp = await axios({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/friend`,
      method: "DELETE",
      data: {
        user1: user._id,
        user2,
      },
    });
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const friendsList =
    friends?.length > 0 &&
    friends.map((f) => {
      return (
        <div>
          {f.username}
          <button onClick={() => handleUnfriend(f._id)}>Unfriend</button>
        </div>
      );
    });

  return (
    <div>
      <h2>Your Friends</h2>
      {friendsList}
    </div>
  );
}
