import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { Alert, Button, css, Snackbar, Typography } from "@mui/material";
import GoBackButton from "../../components/atoms/GoBackButton";
import { updateProfesor } from "../../api/updateProfesor";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/features/main";
import ProfesorForm from "../../components/organisms/ProfesorForm";

function Profesor_Modificar() {
  const { state } = useLocation();

  const [usedEmails,setUsedEmails] = useState([])
  const [usedCedulas,setUsedCedulas] = useState([])

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const editarProfesor = async ({ nombre, apellido, email,cedula }) => {
    dispatch(setLoading(true));
    let response = await updateProfesor(state.id, { nombre, apellido, email,cedula });
    dispatch(setLoading(false));
    if (response.status == 200) {
      setOpen(true);
    } else {
      if( response.data.errors.some ( error => error.field === 'email' && error.rule === 'unique' ) ) {
        setUsedEmails([...usedEmails,email])
      }
      if( response.data.errors.some ( error => error.field === 'cedula' && error.rule === 'unique' ) ) {
        setUsedCedulas([...usedCedulas,cedula])
      }
    }
  };

  return (
    <div>
      <Snackbar
        css={css`
          svg {
            color: white;
          }
        `}
        open={open}
        autoHideDuration={1000}
        onClose={() => setOpen(false)}
      >
        <Alert variant="filled" severity="success">
          Cuenta modificada satisfactoriamente
        </Alert>
      </Snackbar>
      <GoBackButton to={"prev"} />
      <h2>Administración de profesores</h2>
      <h3>Modificando cuenta</h3>
      <h3>Modificando información de la cuenta</h3>

      <ProfesorForm
        onSubmit={editarProfesor}
        defaultValues={{
          nombre: state.nombre,
          apellido: state.apellido,
          email: state.email,
          cedula:state.cedula
        }}
        usedEmails={usedEmails}
        usedCedulas={usedCedulas}
      />
    </div>
  );
}

export default Profesor_Modificar;
