import { getEvaluaciones } from "api/getEvaluaciones";
import SeccionesTitles from "components/SeccionesTitles";
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

  const { lapso } = useParams();
  const { state } = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getEvaluaciones({ materiaId: state?.materia?.id, lapso })
      .then((evs) => setEvaluaciones(evs))
      .finally(() => dispatch(setLoading(false)));
  });

  return (
    <>
      <SeccionesTitles newSubtitle="Listado de los lapsos de evaluaciones"/>

      <TablaBusqueda
        datos={evaluaciones}
        formato={formato}
        emptyMessage="No hay ninguna evaluaciones asignada a esta clase"
      />
    </>
  );
}

export default EvaluacionesPorClaseSeccion;
