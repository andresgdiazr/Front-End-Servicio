import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { Box } from "@mui/material";

function ProfesorLayout() {
  const navbar = [["Inicio", "/dashboard-profesor"]];

  return (
    <>
      <Navbar names={navbar} />
      <Box sx={{ padding: "1rem 2rem" }}>
        <Outlet />
      </Box>
    </>
  );
}

export default ProfesorLayout;
