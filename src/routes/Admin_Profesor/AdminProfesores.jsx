import React from "react";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InfoProfesores from "../../components/tables/InfoProfesores";
import TextField from "@mui/material/TextField";
import GoBackButton from "../../components/atoms/GoBackButton";
import { css } from "@emotion/react";

function AdminProfesores() {
  const [text, setText] = useState("");

  const inputHandler = ({ target }) => {
    const lowerCase = target.value.toLowerCase();
    setText(lowerCase);
  };

  return (
    <div>
      <GoBackButton to={"prev"} />

      <h2>Administrador de Profesores</h2>
      <h3>Listado de profesores</h3>

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

      <InfoProfesores input={text} />
    </div>
  );
}

export default AdminProfesores; 
