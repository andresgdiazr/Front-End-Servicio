import { Delete, Edit, RepeatOneSharp } from "@mui/icons-material";
import React, { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useTable } from "react-table";
import { disableEvaluacion } from "../../api/disableEvaluacion";
import { getEvaluaciones } from "../../api/getEvaluaciones";

function EvaluacionesTable() {
  const navigate = useNavigate();

  const { lapso, id } = useParams();

  const [evaluaciones, setEvaluaciones] = useState([]);

  useEffect(() => {
    getEvaluaciones({ lapso, materiaId: id }).then((evs) =>
      setEvaluaciones(evs)
    );
  }, []);

  const memoData = useMemo(() => evaluaciones, [evaluaciones]);

  const columns = useMemo(
    () => [
      { Header: "Evaluacion", accessor: "titulo" },
      { Header: "Acciones", accessor: "acciones" },
    ],
    []
  );

  const tableInstance = useTable({
    columns,
    data: memoData,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const renderCell = (cell) => {
    if (cell.column.id == "acciones") {
      return (
        <div>
          <Delete
            onClick={async () => {
              const response = await disableEvaluacion(cell.row.original.id);
              if( response.status == 200 ) {
                navigate(0)
              }
            }}
          />
          <Link to={`${cell.row.original.id}/editar`} >
            <Edit />
          </Link>
        </div>
      );
    }

    return cell.render("Cell");
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

export default EvaluacionesTable;
