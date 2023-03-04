import { css } from "@emotion/react";
import { Upload } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";

function ProfesorEvaluaciones({ clase, lapso, data, materia }) {
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      { Header: "Evaluacion", accessor: "evaluacion" },
      { Header: "Accion", accessor: "accion" },
    ],
    []
  );

  const memoData = useMemo(() => data, [data]);

  const tableInstance = useTable({
    columns,
    data: memoData,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    // apply the table props
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
        Plan de evaluacion para Lapso {lapso}{" "}
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
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {cell.value ? (
                            cell.render("Cell")
                          ) : (
                            <a
                              onClick={() =>
                                navigate(
                                  `/dashboard-profesor/clases/${clase.id}/evaluaciones/${cell.row.original.fulldata.id}/notas`,
                                  {
                                    state: {
                                      clase,
                                      materia,
                                      evaluacion: cell.row.original.fulldata,
                                    },
                                  }
                                )
                              }
                            >
                              <Upload />
                            </a>
                          )}
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default ProfesorEvaluaciones;
