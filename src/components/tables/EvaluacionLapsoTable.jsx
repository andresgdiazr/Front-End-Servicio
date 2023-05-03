import { css } from "@emotion/react";
import { Book, Visibility } from "@mui/icons-material";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import THead from "../molecules/THead";

function EvaluacionLapsoTable({ materiaData = {} }) {
  const columns = useMemo(
    () => [
      { Header: "Lapso", accessor: "lapso" },
      { Header: "Acciónes", accessor: "acciones" },
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

  const CellContent = ({ cell }) => {
    if (cell.column.id === 'acciones') {
      return (
        <div
        css={css`
          display: flex;
          justify-content: center;
          svg {
            margin: 0 1rem;
          }
        `}
      >
        <Link
          state={{ ...materiaData }}
          to={`lapsos/${cell.row.original.lapsoNumber}/evaluaciones`}
        >
          <Visibility />
        </Link>

        <Book />
      </div>
      )
    }
    return cell.render("Cell");
  };

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
      <THead headerGroups={headerGroups} />
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}> <CellContent  cell={cell} /> </td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default EvaluacionLapsoTable;
