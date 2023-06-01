import React from "react";
import GenericTitles from "components/GenericTitles";
import { useSeccionData, useMateriaData, useLapsoData } from "store/features/navigationData";
import añoIntToString from "utils/añoIntToString";
//TODO lapso no se busca en navigationData
function SeccionesTitles({ title = "", prevSubtitles = [], newSubtitle }) {
  const seccion = useSeccionData();
  const materia = useMateriaData();
  const lapso = useLapsoData();

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
