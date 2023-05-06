import { css } from "@emotion/react";
import { Upload } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import THead from "../molecules/THead";
import EmptyTableRow from "../molecules/EmptyTableRow";

function ProfesorEvaluacionesTable({ clase, lapso, data, materia }) {
  const columns = useMemo(
    () => [
      { Header: "Evaluacion", accessor: "evaluacion" },
      {
        Header: "Accion",
        accessor: "accion",
        Cell: ({ row }) => {
          return (
            <Link
              to={`${row.original.fulldata.id}/notas`}
              state={{
                clase,
                materia,
                evaluacion: row.original.fulldata,
              }}
            >
              <Upload />
            </Link>
          );
        },
      },
    ],
    [clase, materia]
  );

  const memoData = useMemo(() => data, [data]);

  const tableInstance = useTable({
    columns,
    data: memoData,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div
      css={css`
        width: 50%;
        margin: 1rem auto;
        h2 {
          font-size: 1.6rem;
          margin-bottom: 1rem;
        }
      `}
    >
      <Typography variant="h2">
        Plan de evaluacion para Lapso {lapso}
      </Typography>

      <table
        css={css`
          td,
          th {
            text-align: center;
          }
        `}
        {...getTableProps()}
      >
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
            message="No hay evaluaciones para este lapso"
          />
        </tbody>
      </table>
    </div>
  );
}

export default ProfesorEvaluacionesTable;
