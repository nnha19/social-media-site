import React from "react";
import Users from "../components/Users/Users";
import styles from "../styles/usersPage.module.scss";

const UsersPage = () => {
  return (
    <div className={styles.users}>
      <Users />;
    </div>
  );
};

export default UsersPage;
