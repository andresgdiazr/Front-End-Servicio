import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import SeccionesTitles from "components/SeccionesTitles";

function SeccionDetalles() {
	return (
		<>
			<SeccionesTitles></SeccionesTitles>

			<Button
				variant="text"
				component={Link}
				to={`estudiantes`}

			>
				Ver listado de estudiantes
			</Button>

			<Button
				variant="text"
				component={Link}
				to={`materias`}
			>
				Ver lista de clases
			</Button>


			<Button
				variant="text"
				component={Link}
				to={`notas`}
			>
				Notas De Seccion
			</Button>

			<Button
				variant="text"
				component={Link}
				to={`añadir_estudiantes`}
			>
				Añadir estudiantes
			</Button>

			<Button
				variant="text"
				component={Link}
				to={`modificar`}
			>
				Modificar año y sección
			</Button>
		</>
	);
}

export default SeccionDetalles;
