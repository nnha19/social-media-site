import { useRouter } from "next/router";
import React from "react";
const withAuth = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        Router.push("/signup");
        return null;
      }
      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default withAuth;
