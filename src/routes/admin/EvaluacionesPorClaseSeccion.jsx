import { Typography } from "@mui/material";
import { getEvaluaciones } from "api/getEvaluaciones";
import TablaBusqueda from "components/tables/GenericSearchTable";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { setLoading } from "store/features/main";

const formato = [
  { Header: "Id", accessor: "id" },
  { Header: "Evaluacion", accessor: "titulo" },
];

function EvaluacionesPorClaseSeccion() {
  const [evaluaciones, setEvaluaciones] = useState([]);

  const { lapsoNumber: lapso } = useParams();
  const { state } = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getEvaluaciones({ materiaId: state?.materia?.id })
      .then((evs) => setEvaluaciones(evs.filter( ev => ev.lapso == lapso) ))
      .finally(() => dispatch(setLoading(false)));
  });

  return (
    <>
      <Typography variant="h2"> Adminstración de secciones</Typography>
      <Typography variant="subtitle1">Listado de evaluaciones</Typography>
      <Typography variant="subtitle1">
        clase : {state?.materia?.nombre} , año : {state?.materia.año}, seccion :{" "}
        {state?.clase?.seccion?.codigo} , lapso : {lapso}
      </Typography>

      <TablaBusqueda datos={evaluaciones} formato={formato} emptyMessage="No hay ninguna evaluaciones asignada a esta clase" />
    </>
  );
}

export default EvaluacionesPorClaseSeccion;
