import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button, Container, css, Typography } from "@mui/material";
import { getClases } from "../../api/profesores_clases";

import { ClasesProfesoresTable } from "../../components/tables/ClasesProfesoresTable";
import { useProfesorClases } from "../../store/features/profesorClases";

function ProfesorClases() {
  const { state } = useLocation();
  const params = useParams();
  const clases = useProfesorClases({ profesorId: params.id });

  const profesor = state.profesores.find((p) => p.id === parseInt(params.id));

  return (
    <Container>
      <h1>Administración de profesores</h1>

      <Typography>
        {profesor.nombre} {profesor.apellido}
      </Typography>

      <ClasesProfesoresTable profesor={profesor} datos={clases} />

      <Link
        to="crear"
        state={{
          profesor,
        }}
      >
        <Button
          css={css`
            margin-top: 1rem;
          `}
          variant="contained"
        >
          Añadir clase
        </Button>
      </Link>
    </Container>
  );
}

export default ProfesorClases;
