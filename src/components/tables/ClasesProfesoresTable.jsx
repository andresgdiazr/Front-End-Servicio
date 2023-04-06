import React from "react";
import { useTable } from "react-table";
import { useMemo } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { css } from "@emotion/react";

import "../../css/tablas.css";
import EmptyTableRow from "../molecules/EmptyTableRow";
import THead from "../molecules/THead";
import { deleteClase } from "../../api/deleteClase";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/features/main";
import { removeClase } from "../../store/features/profesorClases";
import { Link } from "react-router-dom";

export function ClasesProfesoresTable({ datos, profesor = {} }) {
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        Header: "Materia",
        accessor: "materia.nombre",
      },
      {
        Header: "Año",
        accessor: "materia.año",
      },
      {
        Header: "Sección",
        accessor: "seccion.codigo",
      },
      {
        Header: "Acciónes",
        accessor: "acciones",
        Cell: ({ row }) => {
          const claseId = row.original.id;
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
              <VisibilityIcon />
              <Link to={`${claseId}/editar`} state={{ profesor,clase:row.original }}>
                <EditIcon />
              </Link>
              <DeleteIcon
                onClick={async () => {
                  dispatch(setLoading(true));
                  const response = await deleteClase({ claseId });
                  if (response.status === 204) {
                    dispatch(removeClase({ claseId }));
                  }
                  dispatch(setLoading(false));
                }}
              />
            </div>
          );
        },
      },
    ],
    []
  );

  const data = useMemo(() => datos, [datos]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="container">
      <table {...getTableProps()}>
        <THead headerGroups={headerGroups} />
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
          <EmptyTableRow
            headerGroups={headerGroups}
            rows={rows}
            message="El profesor no tiene  ninguna clase asignada aun"
          />
        </tbody>
      </table>
    </div>
  );
}
