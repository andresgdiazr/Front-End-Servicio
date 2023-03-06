import { css } from "@emotion/react";
import Book from "@mui/icons-material/Book";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";

import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTable } from "react-table";
import { disableMateria } from "../../api/disableMateria";
import { getMateriasByYear } from "../../api/getMateriasByYear";

function MateriasAñoTable() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const { year } = useParams();

  const onClickDelete = (id) => {
    disableMateria(id).then((response) => {
      if (response.status == 200) {
        navigate(0);
      }
    });
  };

  useState(() => {
    getMateriasByYear(year).then((materias) => setData(materias));
  }, []);

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

  const tableInstance = useTable({
    columns,
    data: memoData,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    // apply the table props

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
                      <td css={css``} {...cell.getCellProps()}>
                        {cell.value ? (
                          cell.render("Cell")
                        ) : (
                          <div
                            css={css`
                              svg {
                                margin: 0 0.5rem;
                                cursor: pointer;
                              }
                            `}
                          >
                            <Delete
                              onClick={() =>
                                onClickDelete(cell.row.original.id)
                              }
                            />
                            <Link
                              to={`/dashboard-control/admin/materias/${cell.row.original.id}/editar`}
                              state={{
                                materias: data,
                                target: cell.row.original,
                              }}
                            >
                              <Edit />
                            </Link>
                            <Book />
                          </div>
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
  );
}

export default MateriasAñoTable;
