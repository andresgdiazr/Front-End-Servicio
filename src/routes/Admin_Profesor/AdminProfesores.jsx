import React from "react";

import {  useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InfoProfesores from "../../components/tables/InfoProfesores";
import TextField from "@mui/material/TextField";
import { css } from "@emotion/react";
import { Button } from "@mui/material";
import { getProfesores } from "../../api/profesores";
import { useDispatch } from "react-redux";
import TablaBusqueda from "../../components/tables/TABLAUNICA";


import { setLoading } from "../../store/features/main";

function AdminProfesores() {
  const [text, setText] = useState("");
  const [profesores, setProfesores]= useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfesores = async () => {
      dispatch(setLoading(true));
      const profesoresRes = await getProfesores();
      setProfesores(profesoresRes);
      dispatch(setLoading(false));
      
    };

    fetchProfesores();
  }, []);


  const inputHandler = ({ target }) => {
    const lowerCase = target.value.toLowerCase();
    setText(lowerCase);
  };

  return (
    <div>
      <h2>Administrador de Profesores</h2>
      <h3>Listado de profesores</h3>

      <Link to="crear">
        <Button css={css`margin-bottom:1rem;`} variant="contained">Crear Profesor</Button>
      </Link>

      <TextField
        css={css`
          margin-bottom: 1.5rem;
        `}
        id="outlined-basic"
        variant="outlined"
        fullWidth
        label="Buscar profesores"
        onChange={inputHandler}
      />

      <TablaBusqueda input={text} datos={profesores} nombre={"INFO_PROFESOR"} />

    </div>
  );
}

export default AdminProfesores; 
