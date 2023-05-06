import { css } from "@emotion/react";
import { Description } from "@mui/icons-material";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";

import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTable, useSortBy } from "react-table";
import { disableMateria } from "api/disableMateria";
import { deleteMateria, useMaterias } from "store/features/materias";
import añoToData from "utils/añoToData";

function MateriasAñoTable() {
  const { year: año } = useParams();

  const data = useMaterias(añoToData(año).value);
  const dispatch = useDispatch();

  const onClickDelete = (id) => {
    disableMateria(id).then((response) => {
      if (response.status == 200) {
        dispatch(deleteMateria({ id }));
      }
    });
  };

  const columns = useMemo(
    () => [
      { Header: "Id", accessor: "id" },
      { Header: "Nombres", accessor: "nombre" },
      { Header: "Materia Padre", accessor: "materia_padre_id" },
      { Header: "Acciones", accessor: "acciones" },
    ],
    []
  );

  const memoData = useMemo(() => data, [data]);

  const sortees = React.useMemo(
    () => [
      {
        id: "id",
        desc: false,
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: memoData,
      initialState: {
        sortBy: sortees,
      },
    },
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  function renderCell(cell) {
    if (cell.column.id === "acciones") {
      return (
        <div
          css={css` // TODO modificar css por MUI?
            svg {
              margin: 0 0.5rem;
              cursor: pointer;
            }
          `}
        >
          <Delete onClick={() => onClickDelete(cell.row.original.id)} />
          <Link
            to={`/dashboard-control/admin/materias/${año}/${cell.row.original.id}/editar`}
          >
            <Edit />
          </Link>
          <Link
            to={`/dashboard-control/admin/materias/${año}/${cell.row.original.id}/lapsos`}
          >
            <Description />
          </Link>
        </div>
      );
    } else if (cell.column.id == "materia_padre_id") {
      if (cell.value === null) {
        return <Typography>Ninguna</Typography>;
      } else {
        return cell.render("Cell");
      }
    } else {
      return cell.render("Cell");
    }
  }

  return (
    <table
      css={css`
        td,
        th {
          text-align: center;
        }
      `}
      {...getTableProps()}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td css={css``} {...cell.getCellProps()}>
                    {renderCell(cell)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default MateriasAñoTable;
