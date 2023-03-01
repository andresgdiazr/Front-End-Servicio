import { css, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import GoBackButton from "../../components/atoms/GoBackButton";
import ClaseInfo from "../../components/organisms/ClaseInfo";

import EvaluacionLapsoTable from "../../components/tables/EvaluacionLapsoTable";

function Clase() {
  const {
    state: { materia,clase},
  } = useLocation();
  const { id: claseId } = useParams();
  const materiaData = {materia,clase}
  return (
    <div>
      <GoBackButton to={"/dashboard-profesor"} />
      <ClaseInfo materia={materia.nombre} año={materia.año} seccion={clase.seccion.codigo} />

      <EvaluacionLapsoTable claseId={claseId} materiaData={materiaData} />
    </div>
  );
}

export default Clase;
