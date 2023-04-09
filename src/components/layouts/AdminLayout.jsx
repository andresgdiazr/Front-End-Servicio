import React from "react";
import { css } from "@emotion/react";
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
		<div>
			<Navbar names={navbar} />
			<Box sx={{ marginTop: "64px", padding: "1rem 2rem" }}>
				<Outlet />
			</Box>
		</div>
	);
}

export default AdminLayout;
