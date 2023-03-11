import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editarEvaluacion } from "../../api/editarEvaluacion";
import GoBackButton from "../../components/atoms/GoBackButton";
import { setLoading } from "../../store/features/main";

function EditarEvaluacion() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { evaluacionId } = useParams();

  const [titulo, setTitulo] = useState("");

  const onSubmit = async (ev) => {
    ev.preventDefault();
    dispatch(setLoading(true))
    const res = await editarEvaluacion({ id: evaluacionId, titulo });
    if ( res.status == 200 ) {
      navigate(-1)
    dispatch(setLoading(false))

    } else {
      dispatch(setLoading(false))

    }
  };

  return (
    <div>
      <GoBackButton to="prev" />
      <Typography> Editar Evaluacion </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          value={titulo}
          onChange={(ev) => setTitulo(ev.target.value)}
          label="Titulo de Evaluacion"
        />
        <Button variant="contained" type="submit">
          Editar
        </Button>
      </form>
    </div>
  );
}

export default EditarEvaluacion;
