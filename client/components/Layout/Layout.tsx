import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { hideDropdownAction } from "../../features/dropdownsSlice";
import { signInAction } from "../../features/userSlice";
import Navbar from "../Navbar/Navbar";

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  const router = useRouter();
  const dropdowns = useAppSelector((state) => state.drodowns);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleHideUsers = (e: any) => {
    for (let key in dropdowns) {
      if (dropdowns[key]) {
        if (e.target.closest(`#${dropdowns[key]}`)) {
          return;
        } else {
          dispatch(hideDropdownAction({}));
        }
      }
    }
  };

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (!user) return;
    user = JSON.parse(user);
    dispatch(signInAction(user));
    router.push("/posts");
  }, []);

  return (
    <div onClick={handleHideUsers} className="wrapper">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
