import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { crearEvaluacion } from "../../api/crearEvaluacion";
import GoBackButton from "../../components/atoms/GoBackButton";

function CrearEvaluacion() {
  const navigate = useNavigate();

  const { id, lapso } = useParams();

  const [titulo, setTitulo] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();
    crearEvaluacion({
      lapso,
      materiaId: id,
      titulo,
    }).then((res) => {
      if (res.status == 201) {
        navigate(-1);
      }
    });
  };

  return (
    <div>
      <GoBackButton to="prev" />
      <form onSubmit={onSubmit}>
        <TextField
          value={titulo}
          onChange={(ev) => setTitulo(ev.target.value)}
          label="Titulo de Evaluacion"
        />
        <Button variant="contained" type="submit">
          Crear
        </Button>
      </form>
    </div>
  );
}

export default CrearEvaluacion;
