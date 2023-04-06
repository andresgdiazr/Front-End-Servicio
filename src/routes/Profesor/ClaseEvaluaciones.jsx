import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import GoBackButton from "../../components/atoms/GoBackButton";
import ClaseInfo from "../../components/organisms/ClaseInfo";
import ProfesorEvaluacionesTable from "../../components/tables/ProfesorEvaluacionesTable";
import { setLoading } from "../../store/features/main";

function ClaseEvaluaciones() {
  const [evaluaciones, setEvaluaciones] = useState([]);

  const dispatch = useDispatch()

  const {
    state: { materia, clase },
  } = useLocation();

  const { lapso } = useParams();



  useEffect(() => {
    dispatch(setLoading(true))
    axios
      .get(`/profesor/materias/${materia.id}/evaluaciones/lapsos/${lapso}`)
      .then( (response) => setEvaluaciones(response.data) )
      .then( ()=> dispatch(setLoading(false))  )
      .catch((err) => dispatch(setLoading(false)));
  }, []);

  return (
    <div>
      <GoBackButton to="prev" />
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
    </div>
  );
}

export default ClaseEvaluaciones;
