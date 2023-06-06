import {
  Button,
  Dialog,
  DialogActions,
  TextField,
  Typography,
  Paper
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { changePassword } from "api/changePassword";
import CustomForm from "components/CustomForm";
import CenteredPaper from "components/layouts/CenteredPaper";

function SetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [successDialog, setSuccessDialog] = useState(false);
  const [failureDialog, setFailureDialog] = useState(false);

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const queryString = window.location.search;
    const parameters = new URLSearchParams(queryString);
    const token = parameters.get("token");

    const response = await changePassword({ password, token });

    if (response.status == 200) {
      setSuccessDialog(true);
    } else {
      setFailureDialog(true);
    }
  };

  return (
    <CenteredPaper>
      <Button component={Link} variant="text" to="/login">Ir a inicio de sesión</Button>

      <Typography variant="h1" sx={{my: "2rem"}}>Sistema de administración de notas del Colegio Santísimo Salvador</Typography>
      <Dialog open={failureDialog} onClose={() => navigate("/login")}>
        <Typography>
          El link que ha utilizado es incorrecto o expiro contacte con el
          administrador para obtener uno nuevo
        </Typography>
        <DialogActions>
          <Button onClick={() => navigate("/login")}>Continuar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={successDialog} onClose={() => navigate("/login")}>
        <Typography>Su contraseña ha sido cambiada correctamente</Typography>
        <DialogActions>
          <Button onClick={() => navigate("/login")}>Continuar</Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h2">Ingrese la nueva contraseña para su cuenta</Typography>
      <CustomForm onSubmit={onSubmit}>
        <TextField
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          label="Contraseña"
          type="password"
        />
        <Button type="submit" variant="outlined">
          Confirmar
        </Button>
      </CustomForm>
    </CenteredPaper>
  );
}

export default SetPassword;
