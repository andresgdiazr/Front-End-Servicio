import TablaBusqueda from "components/tables/GenericSearchTable";
import React from "react";
import { Link, useLocation } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import SeccionesTitles from "components/SeccionesTitles";

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
        <Link to={`${lapso}/evaluaciones`} state={{...state, lapso: lapso}}>
          <VisibilityIcon />
        </Link>
      </>
    );
  };

  return (
    <>
      <SeccionesTitles newSubtitle="Lapsos de evaluaciones" />

      <TablaBusqueda datos={rows} formato={cols} acciones={Acciones} />
    </>
  );
}

export default LapsosDeEvaluacionesPorClaseSeccion;
