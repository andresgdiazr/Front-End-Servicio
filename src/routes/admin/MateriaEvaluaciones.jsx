import { Button } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import EvaluacionesTable from "components/tables/EvaluacionesTable";
import TablaBusqueda from "components/tables/GenericSearchTable";
import { deleteEvaluacion, useEvaluaciones } from "store/features/evaluaciones";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setLoading } from "store/features/main";
import { disableEvaluacion } from "api/disableEvaluacion";

function MateriaEvaluaciones() {
  const { lapso, id } = useParams();

  const evaluaciones = useEvaluaciones({ materiaId: id, lapso });

	const dispatch = useDispatch();

  const Acciones = ({ cell }) => {
    return (
      <>
        <Delete
          onClick={async () => {
            dispatch(setLoading(true));
            const response = await disableEvaluacion(cell.row.original.id);
            if (response.status == 200) {
              dispatch(
                deleteEvaluacion({
                  materiaId: id,
                  evaluacionId: cell.row.original.id,
                })
              );
              dispatch(setLoading(false));
            } else {
              dispatch(setLoading(false));
            }
          }}
        />
        <Link to={`${cell.row.original.id}/editar`}>
          <Edit />
        </Link>
      </>
    );
  };

  return (
    <>
      <Button variant="contained" component={Link} to={`crear`}>
        Crear evaluación
      </Button>

      <TablaBusqueda
        datos={evaluaciones}
        formato={formato}
        acciones={Acciones}
        emptyMessage="No hay ninguna evaluacion para este lapso"
      />
    </>
  );
}

const formato = [
  { Header: "Evaluacion", accessor: "titulo" },
  { Header: "Acciones", accessor: "acciones" },
];

export default MateriaEvaluaciones;
