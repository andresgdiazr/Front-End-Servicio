import React from "react";
import { useTable } from "react-table";
import { useState, useEffect, useMemo } from "react";
import { INFO_PROFESOR } from "./columnas";
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

function InfoProfesores({ input }) {
  const [datos, setData] = useState([]);
  const [passwordOverlay, setPasswordOverlay] = useState(false);
  const [passwordRow, setPasswordRow] = useState(null);
  const [passwordLink,setPasswordLink] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!passwordOverlay) {
      setPasswordLink(null)
    }
  },[passwordOverlay])


  const informacion = (id) => {
    navigate(`${id}/clases`);
  };
  const modificar = (cell) => {
    const row = cell.row.original;
    navigate(`${row.id}/modificar`, { state: row });
  };

  useEffect(() => {
    const fetchProfesores = async () => {
      dispatch(setLoading(true))
      const profesoresRes = await getProfesores();
      setData(profesoresRes);
      dispatch(setLoading(false))
    };

    fetchProfesores();
  }, []);

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

  const columns = useMemo(() => INFO_PROFESOR);

  const data = useMemo(() => filteredData);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

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
          <Button variant="contained" onClick={async () => {
            if( passwordLink ) {
              return
            }
            const response = await getChangePasswordToken(passwordRow)
            if(response.status === 200) {
              const link = `http://localhost:5173/set-password?token=${response.data.token}`
              setPasswordLink(link)
            }
            
          }}>
            Generar link para cambiar contraseña
          </Button>
          { passwordLink && <Typography css={css`font-size:0.8rem;`} > {passwordLink} </Typography> }
          
        </div>
      </Overlay>
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
                  if (typeof cell.value !== "number")
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
														align-items:center;
														svg {
															cursor:pointer;
														}
													`}
                        >
                          <SchoolIcon
                            onClick={() => {
                              informacion(cell.value);
                            }}
                          />

                          <EditIcon
                            onClick={() => {
                              modificar(cell);
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
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default InfoProfesores;
