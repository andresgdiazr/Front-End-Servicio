import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { Box } from "@mui/material";

function AdminLayout() {
  const navbar = [
    ["Inicio", "/dashboard-control"],
    ["Profesor", "admin/profesores"],
    ["Seccion", "admin/secciones"],
    ["Materia", "admin/materias"],
  ];

  return (
    <>
      <Navbar names={navbar} />
      <Box sx={{ padding: "1rem 2rem" }}>
        <Outlet />
      </Box>
    </>
  );
}

export default AdminLayout;
