import { css, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import GoBackButton from "../../components/atoms/GoBackButton";
import MateriasAñoTable from "../../components/tables/MateriasAñoTable";

function MateriasPorAño() {
  const { state } = useLocation();



  return (
    <div
      css={css`
        h2 {
          font-size:1.5rem;
          margin-bottom:0.5rem;
        }

        h1 {
          font-size: 1.5rem;
          margin-bottom:0.5rem;
        }
        

      `}
    >
      <GoBackButton to="prev" />
      <Typography variant="h2" >Administracion de materias</Typography >
      <Typography >Materias por año</Typography>

        <div css={css`
          width:70%;
          margin: 0 auto;
          margin-top:1.2rem;
        `}>
          <Typography variant="h1" >Lista de materias de {state.display}</Typography >

          <MateriasAñoTable />
        </div>

    </div>
  );
}

export default MateriasPorAño;
