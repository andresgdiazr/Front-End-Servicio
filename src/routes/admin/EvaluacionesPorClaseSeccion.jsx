import { Typography } from "@mui/material";
import { getEvaluaciones } from "api/getEvaluaciones";
import GenericTitles from "components/GenericTitles";
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
    getEvaluaciones({ materiaId: state?.materia?.id, lapso })
      .then((evs) => setEvaluaciones(evs))
      .finally(() => dispatch(setLoading(false)));
  });

  function createTitle() {
    const mat = state?.materia;
    if (!mat.nombre && !mat.año) return;

    const seccionT = `Sección ${state?.clase?.seccion?.codigo} año ${mat.año}`;
    const materiaT = `${mat.nombre}`;
    const lapsoT = `Lapso ${lapso}`;

    return [seccionT, materiaT, lapsoT];
  }

  return (
    <>
      <GenericTitles
        title="Adminstración de secciones"
        prevSubtitles={createTitle()}
        newSubtitle="Listado de los lapsos de evaluaciones"
      />
      <Typography variant="subtitle1"></Typography>

      <TablaBusqueda
        datos={evaluaciones}
        formato={formato}
        emptyMessage="No hay ninguna evaluaciones asignada a esta clase"
      />
    </>
  );
}

export default EvaluacionesPorClaseSeccion;
