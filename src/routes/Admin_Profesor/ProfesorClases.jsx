import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Container, css, Typography } from "@mui/material";

import { useProfesorClases } from "../../store/features/profesorClases";
import TablaBusqueda from "../../components/tables/GenericSearchTable";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"

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

     <TablaBusqueda datos={clases} formato={CLASES} acciones={createAcciones({
        profesor
     }) }/>

      <Link to="crear"
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


function createAcciones({
  profesor
}){
  return({cell}) => {

    const claseId = cell.row.original.id;
    return (
      <> 
        <VisibilityIcon />
        <Link
          to={`${claseId}/editar`}
          state={{ profesor, clase: cell.row.original }}
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
      </>
    );
  }

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
  },
]

export default ProfesorClases;
