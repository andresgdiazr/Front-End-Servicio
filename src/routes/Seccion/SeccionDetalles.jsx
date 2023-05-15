import React from "react";
import { Typography, Button } from "@mui/material";
import { useLocation, useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function SeccionDetalles() {

	const {
		state: { año, seccion },
	} = useLocation();

	const { id } = useParams();

	return (
		<>
			<div>
				<Typography variant="h2">Administración de secciones</Typography>
				<Typography variant="subtitle1">{`Año ${año}. Sección: ${seccion}`}</Typography>
			</div>
			{/* 			TODO esta lista es inline, deberia ser en varias lineas.
			Ademas discutir el estilo de los botones */}

			<Button
				variant="text"
				component={Link}
				to={`/dashboard-control/admin/secciones/${id}/estudiantes`}

			>
				Ver listado de estudiantes
			</Button>

			<Button
				variant="text"
				component={Link}
				to={`/dashboard-control/admin/secciones/${id}/materias`}
			>
				Ver lista de clases
			</Button>


			<Button
				variant="text"
				component={Link}
				to={`/dashboard-control/admin/secciones/${id}/notas`}
				state={{año,seccion}}
			>
				Notas De Seccion
			</Button>

			<Button
				variant="text"
				component={Link}
				to={`/dashboard-control/admin/secciones/${id}/añadir_estudiantes`}
			>
				Añadir estudiantes
			</Button>

			<Button
				variant="text"
				component={Link}
				state={{
						año: año, /* TODO al volver de modificar esto no se actualiza hasta volver a entrar aqui desde dashboard */
						seccion: seccion,
				}}
				to={`/dashboard-control/admin/secciones/${id}/modificar`}
			>
				Modificar año y sección
			</Button>
		</>
	);
}

export default SeccionDetalles;
