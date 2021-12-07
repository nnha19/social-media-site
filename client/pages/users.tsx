import axios from "axios";
import React from "react";

const Users = ({ users }) => {
  const usersList = users.map((u) => (
    <div key={u._id}>
      <p>{u.username}</p>
    </div>
  ));

  return (
    <div>
      <h1>List of users</h1>
      {usersList}
    </div>
  );
};

export const getStaticProps = async () => {
  const resp = await axios({
    url: `http://localhost:5000/users`,
    method: "GET",
  });
  return {
    props: { users: resp.data },
  };
};

export default Users;
