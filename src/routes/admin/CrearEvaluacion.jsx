import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { crearEvaluacion } from "../../api/crearEvaluacion";
import { addEvaluacion } from "../../store/features/evaluaciones";
import { setLoading } from "../../store/features/main";
import CustomForm from "../../components/CustomForm";

function CrearEvaluacion() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id, lapso } = useParams();

  const [titulo, setTitulo] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();

    dispatch(setLoading(true));
    crearEvaluacion({
      lapso,
      materiaId: id,
      titulo,
    }).then((res) => {
      if (res.status == 201) {
        dispatch(setLoading(false));
        dispatch(
          addEvaluacion({
            materiaId: id,
            evaluacion: res.data,
          })
        );
        navigate(-1);
      }
    });
  };

  return (
    <div>
      <CustomForm onSubmit={onSubmit}>
        <TextField
          value={titulo}
          onChange={(ev) => setTitulo(ev.target.value)}
          label="Titulo de Evaluacion"
        />
        <Button variant="contained" type="submit">
          Crear
        </Button>
      </CustomForm>
    </div>
  );
}

export default CrearEvaluacion;
