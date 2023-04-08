import React from "react";
import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import GoBackButton from "../atoms/GoBackButton";

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
			<div
				css={css`
					margin-top: 64px;
					padding: 1rem 2rem;
				`}
			>
				<Outlet />
			</div>
		</div>
	);
}

export default AdminLayout;
