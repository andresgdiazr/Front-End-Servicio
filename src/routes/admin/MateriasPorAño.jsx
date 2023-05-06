import { Button, css, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import MateriasAñoTable from "components/tables/MateriasAñoTable";
import añoToData from "utils/añoToData";




function MateriasPorAño() {

  const { year: año } = useParams();
 
  return (
    <div
      css={css`
        h2 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        h1 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
      `}
    >
      <Typography variant="h2">Administracion de materias</Typography>

      <Typography>Materias por año</Typography>

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

      <div
        css={css`
          width: 70%;
          margin: 0 auto;
          margin-top: 1.2rem;
        `}
      >
        <Typography variant="h1">
          Lista de materias de {añoToData(año).display}
        </Typography>

        <MateriasAñoTable />
      </div>
    </div>
  );
}


export default MateriasPorAño;
