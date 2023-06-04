import { css, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { crearClase } from "api/creartClase";
import ClaseForm from "components/organisms/ClaseForm";
import { setLoading } from "store/features/main";
import { addClase } from "store/features/profesorClases";
import ProfesorTitleAdmin from "components/ProfesorTitleAdmin";
import { useProfesorData } from "store/features/navigationData";

function CrearClase() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const profesor = useProfesorData();

	const onSubmit = async (data) => {
		dispatch(setLoading(true));
		const response = await crearClase({
			profesorId: profesor.id,
			materiaId: parseInt(data.materia),
			seccionId: parseInt(data.seccion),
		});
		dispatch(setLoading(false));

		if (response.status == 200) {
			dispatch(
				addClase({
					profesorId: profesor.id,
					clase: {
						...response.data,
						seccion: data.seccionObj,
						materia: data.materiaObj,
					},
				})
			);
			navigate(-1);
		} else {
			if (
				response.data.errors.some(
					(error) => error.field === "all" && error.rule === "duplicate"
				)
			) {
				return "dup-error";
			}
		}
	};

	return (
		<>
			<ProfesorTitleAdmin
				prevSubtitles={["Administración de clases"]}
				newSubtitle={"Creación de clase"}
			/>

			<ClaseForm onSubmit={onSubmit} />
		</>
	);
}

export default CrearClase;
