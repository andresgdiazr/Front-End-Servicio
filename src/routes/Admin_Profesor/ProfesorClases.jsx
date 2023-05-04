import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button, Container, css, Typography } from "@mui/material";
import { getClases } from "../../api/profesores_clases";

import { ClasesProfesoresTable } from "../../components/tables/ClasesProfesoresTable";
import { useProfesorClases } from "../../store/features/profesorClases";
import TablaBusqueda from "../../components/tables/GenericSearchTable";

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

      {/*<ClasesProfesoresTable profesor={profesor} datos={clases} />*/}

     <TablaBusqueda datos={clases} formato={CLASES} />

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


const CLASES = [
  {
    Header: "Materia",
    accessor: "materia.nombre",
  },
  {
    Header: "Año",
    accessor: "materia.año",
  },
  {
    Header: "Sección",
    accessor: "seccion.codigo",
  },
  {
    Header: "Acciónes",
    accessor: "acciones",
    Cell: ({ row }) => {
      const claseId = row.original.id;
      return (
        <div
          css={css`
            width=100%;
            display:flex;
            justify-content:space-evenly;
            align-items:center;
            svg {
              cursor:pointer;
            }
          `}
        >
          <VisibilityIcon />
          <Link
            to={`${claseId}/editar`}
            state={{ profesor, clase: row.original }}
          >
            <EditIcon />
          </Link>
          <DeleteIcon
            onClick={async () => {
              dispatch(setLoading(true));
              const response = await deleteClase({ claseId });
              if (response.status === 204) {
                dispatch(removeClase({ claseId }));
              }
              dispatch(setLoading(false));
            }}
          />
        </div>
      );
    },
  },
]

export default ProfesorClases;
