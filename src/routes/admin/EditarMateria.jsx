import {
	Button,
	css,
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
import { editarMateria } from "../../api/editarMateria";
import ErrorInput from "../../components/atoms/ErrorInput";
import { setLoading } from "../../store/features/main";
import { updateMateria, useMaterias } from "../../store/features/materias";
import añoToData from "../../utils/añoToData";
import CustomForm from "../../components/CustomForm";

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
			navigate(-1);
		} else {
			dispatch(setLoading(false));
		}
	};

	return (
		<>
			<Typography
				variant="h2"
				sx={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}
			>
				Administracion de materias
			</Typography>
			<Typography>Modificando la informacion de materia</Typography>
			<CustomForm onSubmit={onUpload}>
					<ErrorInput
						show={error}
						message={"Se requiere el nombre de la materia"}
					/>
					<TextField
						variant="filled"
						css={css`
							width: 400px;
						`}
						label="nombre"
						value={nombre}
						onChange={(ev) => {
							if (ev.target.value.trim() > 0) {
								setError(false);
							}
							setNombre(ev.target.value);
						}}
					/>
					<FormControl
						variant="filled"
						css={css`
							margin-top: 1rem;
							width: 400px;
						`}
					>
						<InputLabel id="materia-padre"> Materia Padre </InputLabel>
						<Select
							labelId="materia-padre"
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
					<Button variant="contained" type="submit">
						Guardar Cambios
					</Button>
			</CustomForm>
		</>
	);
}

export default EditarMateria;
