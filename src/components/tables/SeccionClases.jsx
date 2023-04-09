import React, {useMemo} from "react";
import {useTable} from "react-table";
import { css } from "@emotion/react";
import "../../css/tablas.css";
import { Typography } from "@mui/material";

import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";

function SeccionClases({InfoMaterias}){

    const navigate = useNavigate();
    
    const columns = useMemo(
        () => [
          { Header: "Materias", accessor: "materia.nombre" },
          { Header: "Acción", accessor: "id" },
        ],
        []
      );
    
     const data = useMemo( () => InfoMaterias); 
    

      const tableInstance = useTable({
        columns,
        data: data,
      });
     
      const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      tableInstance;

    return(
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
                                if (typeof(cell.value) !== 'number') {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    );
                                } else
                                    return (
                                        <td {...cell.getCellProps()}>


                                            <div
                                            css={css`
                                            width=100%;
                                            display:flex;
                                            justify-content:space-evenly;
                                            align-items:center;`}
                                            >
                                                {console.log(cell.row.original)}
                                            <VisibilityIcon onClick={ () => navigate(`/dashboard-profesor/clases/${cell.value}`, 
                                            {state: {
                                                materia: cell.row.original.materia,
                                                clase: cell.row.original,
                                              }}
                                              )}
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
    )
}

export default SeccionClases;