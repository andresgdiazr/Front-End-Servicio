import React from "react";
import GenericTitles from "components/GenericTitles";
import { useMateriaData } from "store/features/navigationData";
import { useLocation, useParams } from "react-router-dom";
import añoToData from "utils/añoToData";

function MateriasTitles({ title = "", prevSubtitles = [], newSubtitle }) {
  const { state } = useLocation();
  const materia = useMateriaData();
  const { year, materiaId, lapso: lapsoId } = useParams();

  function añoDisplay() {
    const string = añoToData(year).display;
    return string[0].toUpperCase() + string.slice(1);
  };

  return (
    <GenericTitles
      title={"Administración de materias"}
      prevSubtitles={[
        ...(year ? [añoDisplay()] : []),
        materia && materiaId ? [`${materia.nombre}`] : [],
        lapsoId ? [`Lapso ${lapsoId}`] : [],
        ...prevSubtitles,
      ]}
      newSubtitle={newSubtitle}
    />
  );
}

export default MateriasTitles;
