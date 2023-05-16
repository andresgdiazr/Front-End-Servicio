import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import ClaseInfo from "components/organisms/ClaseInfo";
import ProfesorEvaluacionesTable from "components/tables/ProfesorEvaluacionesTable";
import { setLoading } from "store/features/main";
import { getEvaluaciones } from "api/getEvaluaciones";

function ClaseEvaluaciones() {
  const [evaluaciones, setEvaluaciones] = useState([]);

  const dispatch = useDispatch();

  const {
    state: { materia, clase },
  } = useLocation();

  const { lapso } = useParams();

  console.log(lapso)

  useEffect(() => {
    dispatch(setLoading(true));
    getEvaluaciones({ materiaId: materia.id, lapso })
      .then((evs) => setEvaluaciones(evs))
      .finally(() => dispatch(setLoading(false)));
  }, []);

  return (
    <>
      <ClaseInfo
        materia={materia.nombre}
        año={materia.año}
        seccion={clase.seccion.codigo}
      />
      <ProfesorEvaluacionesTable
        lapso={lapso}
        materia={materia}
        clase={clase}
        data={evaluaciones.map((e) => ({ evaluacion: e.titulo, fulldata: e }))}
      />
    </>
  );
}

export default ClaseEvaluaciones;
