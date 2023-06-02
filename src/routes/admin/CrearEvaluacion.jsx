import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { crearEvaluacion } from "api/crearEvaluacion";
import { addEvaluacion } from "store/features/evaluaciones";
import { setLoading } from "store/features/main";
import CustomForm from "components/CustomForm";
import MateriasTitles from "components/MateriasTitles";

function CrearEvaluacion() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { materiaId, lapso } = useParams();

	const [titulo, setTitulo] = useState("");

	const onSubmit = (ev) => {
		ev.preventDefault();

		dispatch(setLoading(true));
		crearEvaluacion({
			lapso,
			materiaId: materiaId,
			titulo,
		}).then((res) => {
			if (res.status == 201) {
				dispatch(setLoading(false));
				dispatch(
					addEvaluacion({
						materiaId: materiaId,
						evaluacion: res.data,
					})
				);
				navigate(-1);
			}
		});
	};

	return (
		<>
			<MateriasTitles newSubtitle="Crear evaluación"/>
			<CustomForm onSubmit={onSubmit}>
				<TextField
					value={titulo}
					onChange={(ev) => setTitulo(ev.target.value)}
					label="Titulo de Evaluacion"
				/>
				<Button variant="contained" type="submit">
					Crear evaluación
				</Button>
			</CustomForm>
		</>
	);
}

export default CrearEvaluacion;
