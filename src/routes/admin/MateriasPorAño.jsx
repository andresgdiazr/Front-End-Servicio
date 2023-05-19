import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import MateriasAñoTable from "components/tables/MateriasAñoTable";
import añoToData from "utils/añoToData";

function MateriasPorAño() {
	const { year: año } = useParams();

	return (
		<>
			<div>
				<Typography variant="h2">Administración de materias</Typography>
				<Typography variant="subtitle1">Materias por año</Typography>
			</div>

			<Button
				variant="contained"
				component={Link}
				to={`/dashboard-control/admin/materias/${año}/crear`}
			>
				Crear Nueva Materia
			</Button>

			<Container>
				<Typography variant="subtitle2">
					Lista de materias de {añoToData(año).display}
				</Typography>

				<MateriasAñoTable />
			</Container>
		</>
	);
}

export default MateriasPorAño;
