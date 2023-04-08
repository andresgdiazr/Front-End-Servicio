import { Alert, css, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { editarClase } from "../../api/editarClase";
import ClaseForm from "../../components/organisms/ClaseForm";
import { setLoading } from "../../store/features/main";
import { editClase } from "../../store/features/profesorClases";

function EditarClase() {
	const { state } = useLocation();
	const params = useParams();
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const dispatch = useDispatch();

	const onSubmit = async (data) => {
		console.log(data);
		dispatch(setLoading(true));
		const response = await editarClase({
			claseId: params.claseId,
			materiaId: data.materia,
			seccionId: data.seccion,
		});
		dispatch(setLoading(false));

		if (response.status == 200) {
			dispatch(
				editClase({
					claseId: params.claseId,
					materia: data.materiaObj,
					seccion: data.seccionObj,
				})
			);
			setOpenSnackbar(true);
		} else {
			if (
				response.data.errors.some(
					(e) => e.field === "all" && e.rule === "duplicate"
				)
			) {
				return "dup-error";
			}
		}
	};

	return (
		<div
			css={css`
				h2 {
					font-size: 1.6rem;
					margin-bottom: 0.5rem;
				}
				p {
					font-size: 1.1rem;
				}
			`}
		>
			<Snackbar
				css={css`
					svg {
						color: white;
					}
				`}
				open={openSnackbar}
				autoHideDuration={1000}
				onClose={() => setOpenSnackbar(false)}
			>
				<Alert variant="filled" severity="success">
					Clase modificada satisfactoriamente
				</Alert>
			</Snackbar>
			<Typography variant="h2">Administracion de clases</Typography>
			<Typography>Edicion de Clase</Typography>
			<Typography>
				Profesor: {state?.profesor?.nombre} {state?.profesor?.apellido}
			</Typography>

			<ClaseForm
				onSubmit={onSubmit}
				defaultValues={{
					año: state.clase.materia.año,
					seccion: state.clase.seccion_id.toString(),
					materia: state.clase.materia_id.toString(),
				}}
			/>
		</div>
	);
}

export default EditarClase;
