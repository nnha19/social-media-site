import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { hideDropdownAction } from "../../features/dropdownsSlice";
import Navbar from "../Navbar/Navbar";

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  const dropdowns = useAppSelector((state) => state.drodowns);
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

  return (
    <div onClick={handleHideUsers} className="wrapper">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
