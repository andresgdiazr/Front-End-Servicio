import React from "react";
import { Typography } from "@mui/material";
import SeccionForm from "components/organisms/SeccionForm";
import { createSeccion } from "api/createSeccion";
import { setLoading, setSnackbar } from "store/features/main";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SeccionCrear() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onSubmit = async (data) => {
		dispatch(setLoading(true));
		const response = await createSeccion(data);
		dispatch(setLoading(false));
		if (response.status == 200) {
			dispatch(setSnackbar(["Sección creada satisfactoriamente", "success"]));
			navigate(-1, { replace: true });
		} else {
			if (
				response.data.errors.some(
					(error) => error.field === "codigo" && error.rule === "unique"
				)
			) {
				dispatch(setSnackbar(["Sección ya existente", "error"]));
			} else {
				dispatch(setSnackbar(["Error al crear sección", "error"]));
			}
			/* TODO falta alguna otra validacion? Por ejemplo, que año y seccion sean validos, los campos (6to año seccion Z) */
		}
	};

	return (
		<>
			<div>
				<Typography variant="h2">Administración de secciones</Typography>
				<Typography variant="subtitle1">Crear sección</Typography>
			</div>

			<SeccionForm onSubmit={onSubmit} />
		</>
	);
}

export default SeccionCrear;
