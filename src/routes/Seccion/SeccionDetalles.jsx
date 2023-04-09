import React from "react";
import { Typography, Button } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function SeccionDetalles() {
	const navigate = useNavigate();

	const {
		state: { año, seccion },
	} = useLocation();

	const { id } = useParams();

	return (
		<div>
			<Typography>Administración de secciones</Typography>
			<Typography>{`Año ${año}. Sección: ${seccion}`}</Typography>
			<br></br>

			<Button
				onClick={() => {
					navigate(`/dashboard-control/admin/secciones/${id}/estudiantes`);
				}}
			>
				Ver listado de estudiantes
			</Button>
			<br></br>
			<Button
				onClick={() => {
					navigate(`/dashboard-control/admin/secciones/${id}/materias`);
				}}
			>
				Ver lista de clases
			</Button>
			<br></br>
			<Button
				onClick={() => {
					navigate(
						`/dashboard-control/admin/secciones/${id}/añadir_estudiantes`
					);
				}}
			>
				Añadir estudiantes
			</Button>
			<br></br>
			<Button
				onClick={() => {
					navigate(`/dashboard-control/admin/secciones/${id}/modificar`);
				}}
			>
				Modificar año y sección
			</Button>
		</div>
	);
}

export default SeccionDetalles;
