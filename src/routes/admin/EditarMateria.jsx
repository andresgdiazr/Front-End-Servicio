import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editarMateria } from "api/editarMateria";
import ErrorInput from "components/atoms/ErrorInput";
import { setLoading, setSnackbar } from "store/features/main";
import { updateMateria, useMaterias } from "store/features/materias";
import añoToData from "utils/añoToData";
import CustomForm from "components/CustomForm";

function EditarMateria() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { year: año, id } = useParams();

	const materias = useMaterias(añoToData(año).value);

	const target = useMemo(() => materias.find((m) => m.id == id), [materias]);

	const [materiaPadre, setMateriaPadre] = useState(null);
	const [nombre, setNombre] = useState("");
	const [error, setError] = useState(null);

	useEffect(() => {
		if (target) {
			setMateriaPadre(target.materia_padre_id);
			setNombre(target.nombre);
		}
	}, [target]);

	const onUpload = async (ev) => {
		ev.preventDefault();

		if (nombre.trim().length < 1) {
			setError(true);
			return;
		}
		dispatch(setLoading(true));
		const response = await editarMateria(id, {
			nombre,
			materiaPadreId: materiaPadre,
		});

		if (response.status == 200) {
			dispatch(updateMateria({ id, nombre, materia_padre_id: materiaPadre }));
			dispatch(setLoading(false));
			dispatch(setSnackbar(["Materia editada con exito", "success"]))
			navigate(-1);
		} else {
			dispatch(setLoading(false));
		}
	};

	return (
		<>
			<div>
				<Typography variant="h2">Administracion de materias</Typography>
				<Typography variant="subtitle1">
					Modificando la informacion de materia
				</Typography>
			</div>
			
			<CustomForm onSubmit={onUpload}>
				<ErrorInput
					show={error}
					message={"Se requiere el nombre de la materia"}
				/>
				<TextField
					variant="filled"
					label="nombre"
					value={nombre}
					data-cy="materia-nombre-input"

					onChange={(ev) => {
						if (ev.target.value.trim() > 0) {
							setError(false);
						}
						setNombre(ev.target.value);
					}}
				/>
				<FormControl variant="filled">
					<InputLabel id="materia-padre"> Materia Padre </InputLabel>
					<Select
						labelId="materia-padre"
						data-cy="materia-padre-select"
						value={materiaPadre === null ? "Ninguna" : materiaPadre}
						label="Nombre"
						onChange={(ev) => setMateriaPadre(ev.target.value)}
					>
						<MenuItem value={"Ninguna"}>Ninguna</MenuItem>
						{materias
							.filter((mat) => mat.id != target.id)
							.map((mat) => (
								<MenuItem key={mat.id} value={mat.id}>
									{mat.nombre}
								</MenuItem>
							))}
					</Select>
				</FormControl>
				<Button data-cy="submit-edit-materia" variant="contained" type="submit">
					Guardar Cambios
				</Button>
			</CustomForm>
		</>
	);
}

export default EditarMateria;
