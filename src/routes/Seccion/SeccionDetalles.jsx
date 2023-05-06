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
		<>
			<Typography variant="h2">Administración de secciones</Typography>
			<Typography variant="subtitle1">{`Año ${año}. Sección: ${seccion}`}</Typography>

			{/* 			TODO esta lista es inline, deberia ser en varias lineas.
			Ademas discutir el estilo de los botones */}
			
			<Button
				onClick={() => {
					navigate(`/dashboard-control/admin/secciones/${id}/estudiantes`);
				}}
			>
				Ver listado de estudiantes
			</Button>

			<Button
				onClick={() => {
					navigate(`/dashboard-control/admin/secciones/${id}/materias`);
				}}
			>
				Ver lista de clases
			</Button>

			<Button
				onClick={() => {
					navigate(
						`/dashboard-control/admin/secciones/${id}/añadir_estudiantes`
					);
				}}
			>
				Añadir estudiantes
			</Button>

			<Button
				onClick={() => {
					navigate(`/dashboard-control/admin/secciones/${id}/modificar`);
				}}
			>
				Modificar año y sección
			</Button>
		</>
	);
}

export default SeccionDetalles;
