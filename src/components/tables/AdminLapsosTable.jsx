import { Book, Visibility } from "@mui/icons-material";
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import { useTable } from "react-table";


  

function AdminLapsosTable() {


  const {year,id} = useParams()



  const columns = useMemo(
    () => [
      { Header: "Lapso", accessor: "lapso" },
      { Header: "Acción", accessor: "acciones" },
    ],
    []
  );

  const data = useMemo(
    () => [
      { lapso: "Lapso 1", lapsoNumber: 1 },
      { lapso: "Lapso 2", lapsoNumber: 2 },
      { lapso: "Lapso 3", lapsoNumber: 3 },
    ],
    []
  );

  const tableInstance = useTable({
    columns,
    data: data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const renderCell = (cell) => {

    if (cell.column.id == "acciones") {
      return (
        <div>
          <Link to={`/dashboard-control/admin/materias/${year}/${id}/lapsos/${cell.row.original.lapsoNumber}/evaluaciones`} >
            <Visibility />
          </Link>
          <Book />
        </div>
      );
    } else {
      return cell.render("Cell");
    }
  };

  return (
    <table {...getTableProps()}>
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
                return <td {...cell.getCellProps()}>{renderCell(cell)}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default AdminLapsosTable;
