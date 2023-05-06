import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Typography,
} from "@mui/material";
import { getProfesores } from "../../api/profesores";
import { useDispatch } from "react-redux";
import TablaBusqueda from "../../components/tables/GenericSearchTable";

import { issueChangePasswordTokenEmail } from "../../api/issueChangePasswordTokenEmail";

import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import Email from "@mui/icons-material/Email";

import { setLoading, setSnackbar } from "../../store/features/main";

function AdminProfesores() {
	const [text, setText] = useState("");
	const [profesores, setProfesores] = useState([]);

	const dispatch = useDispatch();
	const [passwordEmailDialog, setPasswordEmailDialog] = useState(false);
	const [passwordEmailProfesorId, setPasswordEmailProfesorId] = useState(null);

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
		<>
			<PasswordEmailDialog
				passwordEmailDialog={passwordEmailDialog}
				setPasswordEmailDialog={setPasswordEmailDialog}
				passwordEmailProfesorId={passwordEmailProfesorId}
			/>

			<Typography variant="h2">Administrador de Profesores</Typography>
			<Typography variant="h3">Listado de profesores</Typography>

			{/*Crea el profesor*/}

			<Link to="crear">
				<Button sx={{ mb: "1rem" }} variant="contained">
					Crear Profesor
				</Button>
			</Link>

			<TextField
				sx={{ mb: "1.5rem" }}
				id="outlined-basic"
				variant="outlined"
				fullWidth
				label="Buscar profesores"
				onChange={inputHandler}
			/>

			<TablaBusqueda
				input={text}
				datos={profesores}
				formato={INFO_PROFESOR}
				acciones={createAcciones({
					profesores,
					passwordEmailDialog,
					setPasswordEmailDialog,
					setPasswordEmailProfesorId,
				})}
			/>
		</>
	);
}

function PasswordEmailDialog({
	passwordEmailDialog,
	setPasswordEmailDialog,
	passwordEmailProfesorId,
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
						dispatch(setLoading(true));
						try {
							const response = await issueChangePasswordTokenEmail(
								passwordEmailProfesorId
							);
							if (response.status === 200) {
								dispatch(setSnackbar(["Correo enviado con exito", "success"]));
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
	profesores,
	passwordEmailDialog,
	setPasswordEmailDialog,
	setPasswordEmailProfesorId,
}) {
	return ({ cell }) => {
		const navigate = useNavigate();

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
							state: {
								profesor: cell.row.original,
							},
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

const INFO_PROFESOR = [
	{
		Header: "Nombre",
		accessor: "nombre",
	},
	{
		Header: "Apellido",
		accessor: "apellido",
	},
	{
		Header: "Cedula",
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

export default AdminProfesores;
