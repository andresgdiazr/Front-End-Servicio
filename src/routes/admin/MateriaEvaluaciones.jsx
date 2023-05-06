import { Button, Link } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import EvaluacionesTable from "components/tables/EvaluacionesTable";

function MateriaEvaluaciones() {
	return (
		<>
			<Link component={RouterLink} to="crear">
				<Button variant="contained"> Crear Evaluación </Button>
			</Link>

			<EvaluacionesTable />
		</>
	);
}

export default MateriaEvaluaciones;
