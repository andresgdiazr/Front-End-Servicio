import { Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import AdminLapsosTable from "components/tables/AdminLapsosTable";
import { useMaterias } from "store/features/materias";
import añoToData from "utils/añoToData";

function LapsosMateria() {
  const { year: año, id } = useParams();

  const materias = useMaterias(añoToData(año).value);

  const currentMateria = materias.filter((mat) => mat.id == id)[0] || {};

  return (
    <>
      <Typography variant="h1"> Admistracion de materias </Typography>
      <Typography> Materias de {añoToData(año).display} </Typography>
      <Typography> {currentMateria.nombre} </Typography>

      <AdminLapsosTable />
    </>
  );
}

export default LapsosMateria;
