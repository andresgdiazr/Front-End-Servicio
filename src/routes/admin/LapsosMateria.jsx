import React from "react";
import { Link,  } from "react-router-dom";
import TablaBusqueda from "components/tables/GenericSearchTable";
import { Visibility } from "@mui/icons-material";
import MateriasTitles from "components/MateriasTitles";

function LapsosMateria() {
  const Acciones = ({ cell }) => {
    return (
      <>
        <Link
          to={`${cell.row.original.lapsoNumber}/evaluaciones`}
        >
          <Visibility />
        </Link>
      </>
    );
  };

  return (
    <>
      <MateriasTitles newSubtitle="Lista de lapsos"/>

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
