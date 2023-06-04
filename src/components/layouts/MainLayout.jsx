import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import CenteredPaper from "./CenteredPaper";

function MainLayout({ routes }) {
  return (
    <>
      <Navbar names={routes} />

      <CenteredPaper>
        <Outlet />
      </CenteredPaper>
    </>
  );
}

export default MainLayout;
