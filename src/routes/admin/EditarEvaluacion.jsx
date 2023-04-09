import { Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editarEvaluacion } from "../../api/editarEvaluacion";
import {
	editEvaluacion,
	useEvaluaciones,
} from "../../store/features/evaluaciones";
import { setLoading } from "../../store/features/main";
import CustomForm from "../../components/CustomForm";

function EditarEvaluacion() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { evaluacionId, id, lapso } = useParams();

	const evaluacion = useEvaluaciones({ materiaId: id, lapso }).find(
		(ev) => ev.id == parseInt(evaluacionId)
	);

	const [titulo, setTitulo] = useState("");

	useEffect(() => {
		if (evaluacion?.titulo) {
			setTitulo(evaluacion?.titulo);
		}
	}, [evaluacion?.titulo]);

	const onSubmit = async (ev) => {
		ev.preventDefault();
		dispatch(setLoading(true));
		const res = await editarEvaluacion({ id: evaluacionId, titulo });
		if (res.status == 200) {
			navigate(-1);
			dispatch(
				editEvaluacion({
					materiaId: id,
					evaluacionId,
					evaluacion: res.data,
				})
			);
			dispatch(setLoading(false));
		} else {
			dispatch(setLoading(false));
		}
	};

	return (
		<div>
			<Typography> Editar Evaluacion </Typography>
			<CustomForm onSubmit={onSubmit}>
				<TextField
					value={titulo}
					onChange={(ev) => setTitulo(ev.target.value)}
					label="Titulo de Evaluacion"
				/>
				<Button variant="contained" type="submit">
					Editar
				</Button>
			</CustomForm>
		</div>
	);
}

export default EditarEvaluacion;
