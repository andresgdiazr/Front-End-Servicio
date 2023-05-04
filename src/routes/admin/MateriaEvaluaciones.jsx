import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import EvaluacionesTable from "../../components/tables/EvaluacionesTable";

function MateriaEvaluaciones() {
  return (
    <div>
      <Link to="crear">
        <Button variant="contained"> Crear Evaluacion </Button>
      </Link>

      <EvaluacionesTable />
    </div>
  );
}

export default MateriaEvaluaciones;
