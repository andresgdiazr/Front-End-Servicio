import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import EvaluacionesTable from "components/tables/EvaluacionesTable";
import TablaBusqueda from "components/tables/GenericSearchTable";
import { deleteEvaluacion, useEvaluaciones } from "store/features/evaluaciones";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setLoading } from "store/features/main";
import { disableEvaluacion } from "api/disableEvaluacion";
import { set } from "react-hook-form";

function MateriaEvaluaciones() {
  const { lapso, id } = useParams();

  const evaluaciones = useEvaluaciones({ materiaId: id, lapso });

  const dispatch = useDispatch();

  const [evaluacionToDelete, setEvaluacionToDelete] = useState(null);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const onConfirmDelete = async () => {
    dispatch(setLoading(true));
    const response = await disableEvaluacion(evaluacionToDelete);
    if (response.status == 200) {
      dispatch(
        deleteEvaluacion({
          materiaId: id,
          evaluacionId: evaluacionToDelete,
        })
      );
    }
    dispatch(setLoading(false));
    setConfirmDeleteDialog(false);
  };

  const Acciones = ({ cell }) => {
    const evaluacionId = cell.row.original.id;
    return (
      <>
        <Delete
          onClick={async () => {
            setEvaluacionToDelete(evaluacionId);
            setConfirmDeleteDialog(true)
          }}
        />
        <Link to={`${evaluacionId}/editar`}>
          <Edit />
        </Link>
      </>
    );
  };

  return (
    <>
      <Dialog
        open={confirmDeleteDialog}
        onClose={() => setConfirmDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estas seguro que deseas eliminar esta evaluacion?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteDialog(false)} >
            Cancelar
          </Button>
          <Button onClick={onConfirmDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

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
