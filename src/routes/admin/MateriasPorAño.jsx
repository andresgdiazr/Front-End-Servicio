import { Button, Container, css, Typography } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import MateriasAñoTable from "components/tables/MateriasAñoTable";
import añoToData from "utils/añoToData";

function MateriasPorAño() {
	const { year: año } = useParams();

	return (
		<>
			<Typography variant="h2">Administracion de materias</Typography>

			<Typography variant="subtitle1">Materias por año</Typography>

			<Button
				css={css`
					margin-top: 1rem;
				`}
				variant="contained"
			>
				<Link to={`/dashboard-control/admin/materias/${año}/crear`}>
					Crear Nueva Materia
				</Link>
			</Button>

			<Container sx={{ width: "70%", marginTop: "1.2rem" }}>
				<Typography variant="h3">
					Lista de materias de {añoToData(año).display}
				</Typography>

				<MateriasAñoTable />
			</Container>
		</>
	);
}

export default MateriasPorAño;
