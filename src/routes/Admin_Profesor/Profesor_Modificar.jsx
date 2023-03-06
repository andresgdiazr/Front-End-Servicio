import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { Alert, Button, css, Snackbar, Typography } from "@mui/material";
import GoBackButton from "../../components/atoms/GoBackButton";
import { updateProfesor } from "../../api/updateProfesor";

function Profesor_Modificar() {
  const {state} = useLocation()

  const [nombre, setNombre] = useState(state.nombre);
  const [apellido, setApellido] = useState(state.apellido);
  const [email, setEmail] = useState(state.email);
  const [open,setOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await updateProfesor(state.id,{nombre,apellido,email})
    if(  response.status == 200 ) {
      setOpen(true)
    }
  };


  return (
    <div>
      <Snackbar
        css={css` svg { color:white; } `}
        open={open}
        autoHideDuration={1000}
        onClose={()=>setOpen(false)}
      >
        <Alert variant="filled" severity="success">Cuenta modificada satisfactoriamente</Alert>
      </Snackbar>
      <GoBackButton to={"prev"} />
      <h2>Administración de profesores</h2>
      <h3>Modificando cuenta</h3>
      <h3>Modificando información de la cuenta</h3>

      <form action="" id="login" method="post" onSubmit={handleSubmit}>
        <p className="item">
          <label htmlFor="nombre"> Nombre </label>
          <input
            name="nombre"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </p>
        <p className="item">
          <label htmlFor="apellido"> Apellido </label>
          <input
            type="apellido"
            name="apellido"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </p>

        <p className="item">
          <label htmlFor="email"> Email </label>
          <input
            // type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>

        <p className="item">
          <Button variant="contained" type="submit"> Guardar y Enviar </Button>
        </p>
      </form>
    </div>
  );
}

export default Profesor_Modificar;
