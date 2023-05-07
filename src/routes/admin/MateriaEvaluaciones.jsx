import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import EvaluacionesTable from "components/tables/EvaluacionesTable";

function MateriaEvaluaciones() {
	return (
		<>
			<Button
				variant="contained"
				component={Link}
				to={`crear`}
			>
				 Crear evaluación
			</Button>

			<EvaluacionesTable />
		</>
	);
}

export default MateriaEvaluaciones;
