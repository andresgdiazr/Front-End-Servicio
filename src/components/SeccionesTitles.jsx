import React from "react";
import GenericTitles from "components/GenericTitles";
import { useSeccionData } from "store/features/navigationData";
import añoIntToString from "utils/añoIntToString";
import { useLocation, useParams } from "react-router-dom";
function SeccionesTitles({ title = "", prevSubtitles = [], newSubtitle }) {
  const seccion = useSeccionData();
  const { state } = useLocation();
  const materia = state?.materia;
  const lapso = state?.lapso;
  const params = useParams();

  return (
    <GenericTitles
      title={"Administración de secciones"}
      prevSubtitles={[
        ...((seccion  && params.seccionId) ? [`${añoIntToString(seccion.año)} sección ${seccion.codigo}`] : []),
        (materia && params.materiaId) ? [`${materia.nombre}`] : [],
        (lapso && params.lapso) ? [`Lapso ${lapso}`] : [],
        ...prevSubtitles,
      ]}
      newSubtitle={newSubtitle}
    />
  );
}

export default SeccionesTitles;
