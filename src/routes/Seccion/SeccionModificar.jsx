import { Typography } from "@mui/material";
import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading, setSnackbar } from "store/features/main";
import { updateSeccion } from "api/updateSeccion";
import SeccionForm from "components/organisms/SeccionForm";

function SeccionModificar() {
	const { id: seccionId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onSubmit = async (data) => {
		dispatch(setLoading(true));
		const response = await updateSeccion(seccionId, data);
		dispatch(setLoading(false));
		if (response.status == 200) {
			dispatch(
				setSnackbar(["Sección modificada satisfactoriamente", "success"])
			);
			navigate(-1, { replace: true });
		} else {
			if (
				response.data.errors.some(
					(error) => error.field === "codigo" && error.rule === "unique"
				)
			) {
				dispatch(setSnackbar(["Sección ya existente", "error"]));
			} else {
				dispatch(setSnackbar(["Error al modificar sección", "error"]));
			}
			/* TODO falta alguna otra validacion? Por ejemplo, que año y seccion sean validos, los campos (6to año seccion Z) */
		}
	};

	const {
		state: { año, seccion },
	} = useLocation();

	let defaultValues = {};
	if ((año, seccion)) {
		defaultValues = { año, seccion };
		console.log(defaultValues);
	}

	return (
		<>
			<>
				<div>
					<Typography variant="h2">Administración de secciones</Typography>
					<Typography variant="subtitle1">Modificar sección</Typography>
				</div>

				<SeccionForm onSubmit={onSubmit} defaultValues={defaultValues} />
			</>
		</>
	);
}

export default SeccionModificar;
