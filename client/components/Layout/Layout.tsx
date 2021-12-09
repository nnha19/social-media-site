import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { hideDropdownAction } from "../../features/dropdownsSlice";
import Navbar from "../Navbar/Navbar";

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  const handleHideUsers = (e: any) => {
    console.log("Hello");
    if (e.target.closest("#users-dropdown") || e.target.closest("#users"))
      return;
    dispatch(hideDropdownAction({}));
  };

  return (
    <div onClick={handleHideUsers} className="wrapper">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
