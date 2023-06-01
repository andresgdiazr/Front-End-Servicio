import React from "react";
import GenericTitles from "components/GenericTitles";
import { useSeccionData, useMateriaData, useLapsoData } from "store/features/navigationData";
import añoIntToString from "utils/añoIntToString";
import { useLocation } from "react-router-dom";
function SeccionesTitles({ title = "", prevSubtitles = [], newSubtitle }) {
  const seccion = useSeccionData();
  const { state } = useLocation();
  const materia = state?.materia;
  const lapso = state?.lapso;

  return (
    <GenericTitles
      title={"Administración de secciones"}
      prevSubtitles={[
        ...(seccion ? [`${añoIntToString(seccion.año)} sección ${seccion.codigo}`] : []),
        materia ? [`${materia.nombre}`] : [],
        lapso ? [`Lapso ${lapso}`] : [],
        ...prevSubtitles,
      ]}
      newSubtitle={newSubtitle}
    />
  );
}

export default SeccionesTitles;
