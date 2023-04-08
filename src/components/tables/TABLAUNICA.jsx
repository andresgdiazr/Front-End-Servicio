import React from "react";
import { getTabla } from "./coumnasunicas";

import { useTable } from "react-table";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getProfesores } from "../../api/profesores";
import { css } from "@emotion/react";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";

import "../../css/tablas.css";
import Overlay from "../organisms/Overlay";
import { Button, Typography } from "@mui/material";
import { getChangePasswordToken } from "../../api/getChangePasswordToken";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/features/main";
import THead from "../molecules/THead";
import EmptyTableRow from "../molecules/EmptyTableRow";


function TablaBusqueda({input,datos,nombre}){

    const [passwordOverlay, setPasswordOverlay] = useState(false);
    const [passwordRow, setPasswordRow] = useState(null);
    const [passwordLink, setPasswordLink] = useState(null);
    const navigate = useNavigate();
    //const dispatch = useDispatch();

    useEffect(() => {
        if (!passwordOverlay) {
          setPasswordLink(null);
        }
      }, [passwordOverlay]);

    console.log(datos);
     
    const filteredData = datos.filter((el) => {
         //if no input the return the original
        if (input === "") {
          return el;
        }
        //return the item which contains the user input
        else {
          return el.nombre.toLowerCase().includes(input);
        }
      });

    //Informacion referente a la tabla
    
    const columns = useMemo(() => getTabla(nombre));
    const data = useMemo(() => filteredData);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data })

    //Referente a cada fila y su contenido

    const renderCell = (cell) => {
        if (typeof cell.value !== "number") {
          return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
        }
        else {
          return (
            <td {...cell.getCellProps() }>
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
                <SchoolIcon
                  onClick={() => {
                    
                    navigate(`${cell.value}/clases`,{state:{profesores:datos}});
                  }}
                />
    
                <EditIcon
                  onClick={() => {
                    navigate(`${cell.row.original.id}/modificar`, { state: cell.row.original });
                  }}
                />
    
                <LockIcon
                  onClick={() => {
                    setPasswordRow(cell.row.original.id);
                    setPasswordOverlay(true);
                  }}
                />
              </div>
            </td>
            
          );
        }
      };





      return (
        <div className="container">
          <Overlay
            show={passwordOverlay}
            onShowChange={(value) => setPasswordOverlay(value)}
          >
            <div
              css={css`
                background-color: white;
                width: 70%;
                border-radius: 0.5rem;
                padding: 1rem;
                height: 250px;
              `}
            >
              <Button
                variant="contained"
                onClick={async () => {
                  if (passwordLink) {
                    return;
                  }
                  const response = await getChangePasswordToken(passwordRow);
                  if (response.status === 200) {
                    const link = `${window.origin}/set-password?token=${response.data.token}`;
                    setPasswordLink(link);
                  }
                }}
              >
                Generar link para cambiar contraseña
              </Button>
              {passwordLink && (
                <Typography
                  css={css`
                    font-size: 0.8rem;
                  `}
                >
                  {passwordLink}
                </Typography>
              )}
            </div>
          </Overlay>
          
          <table {...getTableProps()}>
            <THead headerGroups={headerGroups} />
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => renderCell(cell))}
                  </tr>
                );
              })}
              <EmptyTableRow
                message="Actualmente el sistema no cuenta con ningun profesor"
                rows={rows}
                headerGroups={headerGroups}
              />
            </tbody>
          </table>
        </div>
      );
}

export default TablaBusqueda