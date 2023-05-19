import { Typography } from "@mui/material";
import TablaBusqueda from "components/tables/GenericSearchTable";
import React from "react";
import { Link, useLocation } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";

const cols = [
  { Header: "Lapso", accessor: "lapso" },
  { Header: "Acción", accessor: "acciones" },
];

const rows = [
  { lapso: "Lapso 1", lapsoNumber: 1 },
  { lapso: "Lapso 2", lapsoNumber: 2 },
  { lapso: "Lapso 3", lapsoNumber: 3 },
];

function LapsosDeEvaluacionesPorClaseSeccion() {
  const { state } = useLocation();


  const Acciones = ({ cell }) => {

    const lapso = cell.row.original.lapsoNumber;
    


    return (
      <>
  			<Link to={`${lapso}/evaluaciones`} state={state} > 
					<VisibilityIcon />
				</Link>
      </>
    )
  }

  return (
    <>
      <Typography variant="h2"> Adminstración de secciones</Typography>
      <Typography variant="subtitle1">
        Listado de los lapsos de evaluaciones
      </Typography>
      <Typography variant="subtitle1">
        clase : {state?.materia?.nombre} , año : {state?.materia.año}, seccion :{" "}
        {state?.clase?.seccion?.codigo}
      </Typography>

      <TablaBusqueda
        datos={rows}
        formato={cols}
        acciones={ Acciones }
      />

    </>
  );
}

export default LapsosDeEvaluacionesPorClaseSeccion;
