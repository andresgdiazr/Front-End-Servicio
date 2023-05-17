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
import { getProfesores } from "api/profesores";
import { useDispatch } from "react-redux";
import TablaBusqueda from "components/tables/GenericSearchTable";

import { issueChangePasswordTokenEmail } from "api/issueChangePasswordTokenEmail";

import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import Email from "@mui/icons-material/Email";

import { setLoading, setSnackbar } from "store/features/main";
import { useDatos } from "../../hooks/useDatos";
import GenericTitles from "components/GenericTitles";
import { setProfesorData } from "store/features/navigationData";

function AdminProfesores() {

	const { state: profesores, setState: setProfesores} = useDatos('/admin/profesores');

	

	const [text, setText] = useState("");

	const dispatch = useDispatch();
	const [passwordEmailDialog, setPasswordEmailDialog] = useState(false);
	const [passwordEmailProfesorId, setPasswordEmailProfesorId] = useState(null);

	

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

			<GenericTitles
				title="Administración de profesores"
				newSubtitle={["Listado de profesores"]}
			></GenericTitles>

			<Button variant="contained" component={Link} to="crear">
				Crear Profesor
			</Button>

			<TextField
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
		const dispatch = useDispatch();

		const profesorId = cell.row.original.id;
		return (
			<>
				<SchoolIcon
					onClick={() => {
						const profesor = profesores.find((p) => p.id === profesorId);
						dispatch(setProfesorData(profesor));
						navigate(`${profesorId}/clases`, {
							state: { profesores },
						});
					}}
				/>

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
