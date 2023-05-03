import React from "react";
import { useLocation, useParams } from "react-router-dom";
import ClaseInfo from "../../components/organisms/ClaseInfo";
import EvaluacionLapsoTable from "../../components/tables/EvaluacionLapsoTable";
import { Typography, css } from "@mui/material";

function Clase() {
  const {
    state: { materia, clase },
  } = useLocation();
  const { id: claseId } = useParams();
  const materiaData = { materia, clase };
  return (
    <div>
      <ClaseInfo
        materia={materia.nombre}
        año={materia.año}
        seccion={clase.seccion.codigo}
      />

      <div
        css={css`
          h2 {
            font-size: 1.6rem;
            margin-bottom: 1rem;
          }
          width: 50%;
          margin: 1rem auto;
        `}
      >
        <Typography variant="h2">Evaluaciones por Lapso</Typography>

        <EvaluacionLapsoTable claseId={claseId} materiaData={materiaData} />
      </div>
    </div>
  );
}

export default Clase;
