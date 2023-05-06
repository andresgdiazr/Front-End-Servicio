import React from "react";
import { useTable } from "react-table";
import { useState, useEffect, useMemo } from "react";
import { INFO_ESTUDIANTE } from "./columnas";
import { css } from "@emotion/react";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import "../../css/tablas.css";

import { getEstudiantes } from "api/admin_estudiantes";
import { useNavigate } from "react-router-dom";

export function Estudiantes_table({ input, id }) {
  const navigate = useNavigate();

  const [estudiante, setEstudiante] = useState([]);

  useEffect(() => {
    const fetchProfesores = async () => {
      let estudiantesRes = await getEstudiantes(id);

      let estudianteRes = estudiantesRes.map((estudiante) => {
        return {
          ...estudiante,
          nombres: `${estudiante.nombre} ${estudiante.apellido}`,
        };
      });

      setEstudiante(estudianteRes);
    };

    fetchProfesores();
  }, []);

  const filteredData = estudiante.filter((el) => {
    //if no input the return the original
    if (input === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      return el.nombres.toLowerCase().includes(input);
    }
  });

  const columns = useMemo(() => INFO_ESTUDIANTE);

  const data = useMemo(() => filteredData);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="container">
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
                  if (typeof cell.value !== "undefined")
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  else
                    return (
                      <td {...cell.getCellProps()}>
                        <div
                          css={css`
												width=100%;
												display:flex;
												justify-content:space-evenly;
												align-items:center;`}
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
                      </td>
                    );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
