import axios from "axios";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function AuthComponent() {
  const navigate = useNavigate();
  const location = useLocation();

  if (sessionStorage.getItem("token")) {
    console.log(sessionStorage.getItem("token"))
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const token = sessionStorage.getItem("token");
  const userType = sessionStorage.getItem("user-type");

  useEffect(() => {
    if ( location.pathname == "/" || (location.pathname != "/login" && !(token && userType)  )  ) {
      if (token && userType) {
        if (userType == "Profesor") {
          navigate("/dashboard-profesor");
        } else {
          navigate("/dashboard-control")
        }
      } else {
        navigate("/login");
      }
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

export default AuthComponent;
