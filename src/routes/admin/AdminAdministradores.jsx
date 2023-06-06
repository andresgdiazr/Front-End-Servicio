import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDispatch } from "react-redux";
import TablaBusqueda from "components/tables/GenericSearchTable";

import { issueChangePasswordTokenEmail } from "api/issueChangePasswordTokenEmail";

import EditIcon from "@mui/icons-material/Edit";
import Email from "@mui/icons-material/Email";

import { setLoading, setSnackbar } from "store/features/main";
import { useDatos } from "../../hooks/useDatos";
import GenericTitles from "components/GenericTitles";

function AdminAdministradores() {
  const { state: administradores, setState: setAdministradores } = useDatos(
    "/admin/control-accounts"
  );

  const [text, setText] = useState("");

  const [passwordEmailDialog, setPasswordEmailDialog] = useState(false);
  const [passwordEmailAdministradorId, setPasswordEmailAdministradorId] =
    useState(null);

  const inputHandler = ({ target }) => {
    passwordEmailAdministradorId;
    const lowerCase = target.value.toLowerCase();
    setText(lowerCase);
  };

  return (
    <>
      <PasswordEmailDialog
        passwordEmailDialog={passwordEmailDialog}
        setPasswordEmailDialog={setPasswordEmailDialog}
        passwordEmailAdministradorId={passwordEmailAdministradorId}
      />

      <GenericTitles
        title="Administración de administradores"
        newSubtitle={["Listado de administradores"]}
      ></GenericTitles>

      <Button variant="contained" component={Link} to="crear">
        Crear administrador
      </Button>

      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        label="Buscar administradores"
        onChange={inputHandler}
      />

      <TablaBusqueda
        input={text}
        datos={administradores}
        formato={INFO_ADMINISTRADOR}
        acciones={createAcciones({
          administradores,
          passwordEmailDialog,
          setPasswordEmailDialog,
          setPasswordEmailAdministradorId,
        })}
      />
    </>
  );
}

function PasswordEmailDialog({
  passwordEmailDialog,
  setPasswordEmailDialog,
  passwordEmailAdministradorId,
}) {
  const dispatch = useDispatch();

  return (
    <Dialog
      open={passwordEmailDialog}
      onClose={() => setPasswordEmailDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        ¿Enviar correo para establecer contraseña?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Está apunto de enviarle un correo al administrador para que establezca
          su contraseña.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setPasswordEmailDialog(false);
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={async () => {
            dispatch(setLoading(true));
            try {
              const response = await issueChangePasswordTokenEmail(
                passwordEmailAdministradorId,
								"administradores"
              );
              if (response.status === 200) {
                dispatch(setSnackbar(["Correo enviado con éxito", "success"]));
              }
            } finally {
              setPasswordEmailDialog(false);
              dispatch(setLoading(false));
            }
          }}
        >
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function createAcciones({
  passwordEmailDialog,
  setPasswordEmailDialog,
  setPasswordEmailAdministradorId,
}) {
  return ({ cell }) => {
    const navigate = useNavigate();

    const administradorId = cell.row.original.id;
    return (
      <>
        <EditIcon
          onClick={() => {
            navigate(`${cell.row.original.id}/modificar`, {
              state: {
                cuenta: cell.row.original,
              },
            });
          }}
        />

        <Email
          onClick={() => {
            if (!passwordEmailDialog) {
              setPasswordEmailDialog(true);
              setPasswordEmailAdministradorId(administradorId);
            }
          }}
        />
      </>
    );
  };
}

const INFO_ADMINISTRADOR = [
  {
    Header: "Nombre",
    accessor: "nombre",
  },
  {
    Header: "Apellido",
    accessor: "apellido",
  },
  {
    Header: "Cédula",
    accessor: "cedula",
  },

  {
    Header: "Correo",
    accessor: "email",
  },
  {
    Header: "Acciones",
    accessor: "acciones",
  },
];

export default AdminAdministradores;
