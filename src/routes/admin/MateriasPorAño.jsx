import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import MateriasAñoTable from "components/tables/MateriasAñoTable";
import MateriasTitles from "components/MateriasTitles";

function MateriasPorAño() {


  return (
    <>
      <MateriasTitles newSubtitle="Lista de materias"/>

      <Button
        variant="contained"
        component={Link}
        data-cy="link-create-materia"
        to={`crear`}
      >
        Crear Nueva Materia
      </Button>

      <MateriasAñoTable />
    </>
  );
}

export default MateriasPorAño;
