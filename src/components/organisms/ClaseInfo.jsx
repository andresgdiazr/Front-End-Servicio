import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import React from "react";

function ClaseInfo({ materia, año, seccion }) {
  return (
    <div
      css={css`
        h1 {
          font-size: 1.8rem;
          margin: 1rem 0;
        }
        margin-bottom: 3rem;
        p {
          font-size: 1.4rem;
          margin: 0.5rem 0;
        }
      `}
    >
      <Typography variant="h1">
        {materia} , año: {año}
      </Typography>
      <Typography>Seccion: {seccion}</Typography>
      <Typography>
        Profesores Carlos Duran y Alberto Pedro (CONSTANTE HAY QUE CAMBIAR)
      </Typography>
    </div>
  );
}

export default ClaseInfo;
