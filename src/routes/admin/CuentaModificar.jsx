import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { updateCuenta } from "../../api/updateCuenta";
import CuentaForm from "../../components/organisms/CuentaForm";
import { setLoading } from "../../store/features/main";
import { Alert, css, Snackbar } from "@mui/material";

function CuentaModificar({ tipo }) {
	
  const [open, setOpen] = useState(false);
	const [usedEmails, setUsedEmails] = useState([]);
  const [usedCedulas, setUsedCedulas] = useState([]);
	
  const { state } = useLocation();
  const {id : profesorId} = useParams();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
		dispatch(setLoading(false));
		const response = await updateCuenta(tipo, profesorId, data);
		dispatch(setLoading(false));
    if (response.status == 200) {
      setOpen(true);
    } else {
      if (
        response.data.errors.some(
          (error) => error.field === "email" && error.rule === "unique"
        )
      ) {
        setUsedEmails([...usedEmails, data.email]);
      }
      if (
        response.data.errors.some(
          (error) => error.field === "cedula" && error.rule === "unique"
        )
      ) {
        setUsedCedulas([...usedCedulas, data.cedula]);
      }
    }
  };

  let defaultValues = {};

  if (state.profesor) {
    defaultValues = state.profesor;
  }

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
      <h2>Administración de {tipo}</h2>
      <h3>Modificando información de la cuenta</h3>

      <CuentaForm
        onSubmit={onSubmit}
        usedEmails={usedEmails}
        usedCedulas={usedCedulas}
        defaultValues={defaultValues}
      />
    </div>
  );
}

export default CuentaModificar;
