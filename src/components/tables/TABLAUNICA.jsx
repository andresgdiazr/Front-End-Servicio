import React from "react";
import { getTabla } from "./coumnasunicas";

import { useTable } from "react-table";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";

import "../../css/tablas.css";
import Overlay from "../organisms/Overlay";
import { Button, Typography } from "@mui/material";

import THead from "../molecules/THead";
import EmptyTableRow from "../molecules/EmptyTableRow";

function Iconos({ state, datos, cell }) {
  const navigate = useNavigate();

  if (state == "INFO_PROFESOR") {
    return (
      <div
        css={css`
            width=100%;
            display:flex;
            justify-content:space-evenly;
            align-items:center;
            svg {
              cursor:pointer;
            }
          `}
      >
        <SchoolIcon
          onClick={() => {
            navigate(`${cell.value}/clases`, { state: { profesores: datos } });
          }}
        />

        <EditIcon
          onClick={() => {
            navigate(`${cell.row.original.id}/modificar`, {
              state: cell.row.original,
            });
          }}
        />

        <LockIcon
          onClick={() => {
            setPasswordRow(cell.row.original.id);
            setPasswordOverlay(true);
          }}
        />
      </div>
    );
  }

  if (state == "INFO_ESTUDIANTE") {
    return (
      <div
        css={css`
            width=100%;
            display:flex;
            justify-content:space-evenly;
            align-items:center;
          `}
      >
        <EditIcon
          onClick={() => {
            navigate(`${cell.row.original.id}/modificar`, {
              state: {
                nombre: cell.row.original.nombre,
                apellido: cell.row.original.apellido,
                id: cell.row.original.id,
              },
            });
          }}
        />
      </div>
    );
  }
}

function TablaBusqueda({
  input,
  datos,
  nombre,
  acciones : Acciones = () => null,
}) {
  const [passwordRow, setPasswordRow] = useState(null);
  const navigate = useNavigate();
  //const dispatch = useDispatch();



  const filteredData = datos.filter((el) => {
    //if no input the return the original
    if (input === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      return el.nombre.toLowerCase().includes(input);
    }
  });

  //Informacion referente a la tabla

  const columns = useMemo(() => getTabla(nombre));
  const data = useMemo(() => filteredData);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  //Referente a cada fila y su contenido

  const renderCell = (cell) => {
    console.log(cell.column.id);
    if (cell.column.id === "acciones") {
      return (
        <td {...cell.getCellProps()}>
          <div
            css={css`
              width=100%;
              display:flex;
              justify-content:space-evenly;
              align-items:center;
              svg {
                cursor:pointer;
              }
            `}
          >
            <Acciones cell={cell} />
          </div>
        </td>
      );
    } else {
      return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
    }
  };

  return (
    <div className="container">

      <table {...getTableProps()}>
        <THead headerGroups={headerGroups} />
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => renderCell(cell))}
              </tr>
            );
          })}
          <EmptyTableRow
            message="Actualmente el sistema no cuenta con ningun profesor"
            rows={rows}
            headerGroups={headerGroups}
          />
        </tbody>
      </table>
    </div>
  );
}

export default TablaBusqueda;
