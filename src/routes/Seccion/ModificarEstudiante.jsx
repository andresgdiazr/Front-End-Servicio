import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
	Button,
	FormControl,
	MenuItem,
	Select,
	TextField,
	InputLabel,
	Typography,
} from "@mui/material";
import { getSecciones } from "api/secciones";
import { updateEstudiante } from "api/updateEstudiante";
import CustomForm from "components/CustomForm";
import { useDispatch } from "react-redux";
import { setLoading, setSnackbar } from "store/features/main";

function ModificarEstudiante() {
	const { state } = useLocation();

	const [nombre, setNombre] = useState(state.nombre);
	const [apellido, setApellido] = useState(state.apellido);
	const [año, setAño] = useState(state.año);
	const [seccion, setSeccion] = useState("A");
	const [secciones, setSecciones] = useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// this fetches the secciones on first render
	useEffect(() => {
		const fetchSecciones = async () => {
			const seccionesRes = await getSecciones();
			const sec = seccionesRes.filter((sec) => sec.id == state.seccionId);
			setSeccion(sec[0].id);
			setSecciones(seccionesRes);
		};

		fetchSecciones();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		let response = await updateEstudiante(state.id, {
			nombre,
			apellido,
			seccion_id: seccion,
			año,
		});
		if (response.status == 200) {
			dispatch(
				setSnackbar(["Cuenta modificada satisfactoriamente", "success"])
			);
			navigate(-1);
		}
	};

	return (
		<>
			<Typography variant="h2">Administración de estudiantes</Typography>
			<Typography variant="subtitle1">Modificando cuentas</Typography>
			<Typography variant="subtitle1">
				Modificando información de la cuenta
			</Typography>

			<CustomForm id="login" method="post" onSubmit={handleSubmit}>
				<FormControl className="item">
					<InputLabel id="label-año"> Año </InputLabel>
					<Select
						labelId="label-año"
						id="año"
						label="Año"
						value={año}
						onChange={(e) => {
							if (secciones.length > 0) {
								const seccionesByYear = secciones.filter(
									(sec) => sec.año == e.target.value
								);
								//TODO esto podria fallar si los años son incorrectos
								setSeccion(seccionesByYear[0].id);
							}
							setAño(e.target.value);
						}}
					>
						<MenuItem value={1}>1</MenuItem>
						<MenuItem value={2}>2</MenuItem>
						<MenuItem value={3}>3</MenuItem>
						<MenuItem value={4}>4</MenuItem>
						<MenuItem value={5}>5</MenuItem>
					</Select>
				</FormControl>

				<FormControl className="item">
					<InputLabel id="label-seccion">Sección</InputLabel>
					<Select
						labelId="label-seccion"
						id="seccion"
						label="Sección"
						value={seccion}
						onChange={(e) => setSeccion(e.target.value)}
					>
						{secciones.length > 0
							? secciones
									.sort((a, b) => (a.codigo < b.codigo ? -1 : 1))
									.map((sec) => {
										if (sec.año === año) {
											return (
												<MenuItem key={sec.id} value={sec.id}>
													{sec.codigo}
												</MenuItem>
											);
										}
									})
							: ["A", "B", "C", "D"].map((sec) => (
									<MenuItem key={sec} value={sec}>
										{sec}
									</MenuItem>
							  ))}
					</Select>
				</FormControl>

				<FormControl className="item">
					<TextField
						id="nombre"
						label="Nombre"
						variant="outlined"
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
					/>
				</FormControl>
				<FormControl className="item">
					<TextField
						id="apellido"
						label="Apellido"
						variant="outlined"
						onChange={(e) => setApellido(e.target.value)}
						value={apellido}
					/>
				</FormControl>

				<Button variant="contained" type="submit">
					Guardar y Enviar
				</Button>
			</CustomForm>
		</>
	);
}

export default ModificarEstudiante;
