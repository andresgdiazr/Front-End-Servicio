import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import ClaseInfo from "components/organisms/ClaseInfo";

import { setLoading } from "store/features/main";
import { getEvaluaciones } from "api/getEvaluaciones";
import TablaBusqueda from "components/tables/GenericSearchTable";
import { Upload } from "@mui/icons-material";
import { Typography } from "@mui/material";

function ClaseEvaluaciones() {
  const [evaluaciones, setEvaluaciones] = useState([]);

  const dispatch = useDispatch();

  const {
    state: { materia, clase },
  } = useLocation();

  const { lapso } = useParams();

  useEffect(() => {
    dispatch(setLoading(true));
    getEvaluaciones({ materiaId: materia.id, lapso })
      .then((evs) => setEvaluaciones(evs))
      .finally(() => dispatch(setLoading(false)));
  }, []);

  const Acciones = ({ cell }) => {
    return (
      <Link
        to={`${cell.row.original.fulldata.id}/notas`}
        state={{
          clase,
          materia,
          evaluacion: cell.row.original.fulldata,
        }}
      >
        <Upload />
      </Link>
    );
  };

  return (
    <>
      <ClaseInfo
        materia={materia.nombre}
        año={materia.año}
        seccion={clase.seccion.codigo}
      />
      <Typography sx={{marginTop:'1rem'}} variant="h2">
				Plan de evaluacion para Lapso {lapso}
			</Typography>

      <TablaBusqueda
        datos={evaluaciones.map((e) => ({ evaluacion: e.titulo, fulldata: e }))}
        formato={formato}
        acciones={Acciones}
        emptyMessage="No hay evaluaciones para este lapso"
      />


    </>
  );
}

const formato = [
  { Header: "Evaluacion", accessor: "evaluacion" },
  { Header: "Acciones", accessor: "acciones" },
];

export default ClaseEvaluaciones;
