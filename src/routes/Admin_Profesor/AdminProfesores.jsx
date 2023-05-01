import React from "react";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InfoProfesores from "../../components/tables/InfoProfesores";
import TextField from "@mui/material/TextField";
import { css } from "@emotion/react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Typography,
} from "@mui/material";
import { getProfesores } from "../../api/profesores";
import { useDispatch } from "react-redux";
import TablaBusqueda from "../../components/tables/TABLAUNICA";

import { issueChangePasswordTokenEmail } from "../../api/issueChangePasswordTokenEmail";

import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import Email from "@mui/icons-material/Email";

import { setLoading } from "../../store/features/main";

function AdminProfesores() {
  const [text, setText] = useState("");
  const [profesores, setProfesores] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordEmailDialog, setPasswordEmailDialog] = useState(false);
  const [passwordEmailProfesorId, setPasswordEmailProfesorId] = useState(null);
  const [successEmailSnackbar, setSuccessEmailSnackbar] = useState(false);

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
      <PasswordEmailSucess
        successEmailSnackbar={successEmailSnackbar}
        setSuccessEmailSnackbar={setSuccessEmailSnackbar}
      />
      <PasswordEmailDialog
        passwordEmailDialog={passwordEmailDialog}
        setPasswordEmailDialog={setPasswordEmailDialog}
        passwordEmailProfesorId={passwordEmailProfesorId}
        setSuccessEmailSnackbar={setSuccessEmailSnackbar}
      />

      <h2>Administrador de Profesores</h2>
      <h3>Listado de profesores</h3>

      <Link to="crear">
        <Button
          css={css`
            margin-bottom: 1rem;
          `}
          variant="contained"
        >
          Crear Profesor
        </Button>
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

      <TablaBusqueda
        input={text}
        datos={profesores}
        nombre={"INFO_PROFESOR"}
        acciones={createAcciones({
          profesores,
          passwordEmailDialog,
          setPasswordEmailDialog,
          setPasswordEmailProfesorId,
        })}
      />
    </div>
  );
}

function PasswordEmailDialog({
  passwordEmailDialog,
  setPasswordEmailDialog,
  passwordEmailProfesorId,
  setSuccessEmailSnackbar,
}) {

  const dispatch = useDispatch()

  return (
    <Dialog
      open={passwordEmailDialog}
      onClose={() => setPasswordEmailDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Enviar correo para establezar contraseña?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Esta apunto de enviarle un correo al profesor para que establezca su
          contraseña.
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
            dispatch(setLoading(true))
            try {

              const response = await issueChangePasswordTokenEmail(
                passwordEmailProfesorId
              );
              if (response.status === 200) {
                setSuccessEmailSnackbar(true);
              }
            } finally {
              setPasswordEmailDialog(false);
              dispatch(setLoading(false))
            }


          }}
        >
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function PasswordEmailSucess({
  successEmailSnackbar,
  setSuccessEmailSnackbar,
}) {
  return (
    <Snackbar
      open={successEmailSnackbar}
      autoHideDuration={6000}
      onClose={() => setSuccessEmailSnackbar(false)}
    >
      <Alert
        css={css`
          background-color: #04aa6d;
          color: white;
          font-size: 1.2rem;

          svg {
            color: white;
          }
        `}
        onClose={() => setSuccessEmailSnackbar(false)}
        severity="success"
      >
        El correo ha sido enviado correctamente
      </Alert>
    </Snackbar>
  );
}

function createAcciones({
  profesores,
  passwordEmailDialog,
  setPasswordEmailDialog,
  setPasswordEmailProfesorId,
}) {



  return ({ cell }) => {
    const navigate = useNavigate()

    const profesorId = cell.row.original.id;
    return (
      <>
        <SchoolIcon
          onClick={() => {
            navigate(`${profesorId}/clases`, {
              state: { profesores },
            });
          }}
        />

        <EditIcon
          onClick={() => {
            navigate(`${cell.row.original.id}/modificar`, {
              state: cell.row.original,
            });
          }}
        />

        <Email
          onClick={() => {
            if (!passwordEmailDialog) {
              setPasswordEmailDialog(true);
              setPasswordEmailProfesorId(profesorId);
            }
          }}
        />
      </>
    );
  };
}

export default AdminProfesores;
