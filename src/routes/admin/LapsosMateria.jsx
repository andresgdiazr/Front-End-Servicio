import { Typography } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useMaterias } from "store/features/materias";
import añoToData from "utils/añoToData";
import TablaBusqueda from "components/tables/GenericSearchTable";
import { Book, Visibility } from "@mui/icons-material";

function LapsosMateria() {
  const { year: año, id } = useParams();

  const materias = useMaterias(añoToData(año).value);

  const currentMateria = materias.filter((mat) => mat.id == id)[0] || {};

  const Acciones = ({ cell }) => {
    return (
      <>
        <Link
          to={`/dashboard-control/admin/materias/${año}/${id}/lapsos/${cell.row.original.lapsoNumber}/evaluaciones`}
        >
          <Visibility />
        </Link>
        <Book />
      </>
    );
  };

  return (
    <>
      <Typography variant="h2"> Admistracion de materias </Typography>
      <Typography variant="subtitle1">
        Materias de {añoToData(año).display}
      </Typography>
      <Typography variant="subtitle1"> {currentMateria.nombre} </Typography>

      <TablaBusqueda datos={datos} formato={cols} acciones={Acciones} />
    </>
  );
}

const cols = [
  { Header: "Lapso", accessor: "lapso" },
  { Header: "Acción", accessor: "acciones" },
];

const datos = [
  { lapso: "Lapso 1", lapsoNumber: 1 },
  { lapso: "Lapso 2", lapsoNumber: 2 },
  { lapso: "Lapso 3", lapsoNumber: 3 },
];

export default LapsosMateria;
