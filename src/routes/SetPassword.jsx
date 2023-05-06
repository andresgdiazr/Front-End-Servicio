import { css } from "@emotion/react";
import {
  Button,
  Dialog,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../api/changePassword";
import CustomForm from "../components/CustomForm";

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
    <div
      css={css`
        padding: 2rem;
      `}
    >
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
      <Typography variant="h1">Ingrese La Contraseña para su cuenta</Typography>
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
    </div>
  );
}

export default SetPassword;
