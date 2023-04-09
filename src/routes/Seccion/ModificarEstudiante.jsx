import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
	Alert,
	Button,
	css,
	FormControl,
	MenuItem,
	Select,
	Snackbar,
	TextField,
	InputLabel,
} from "@mui/material";
import GoBackButton from "../../components/atoms/GoBackButton";
import { getSecciones } from "../../api/secciones";
import { updateEstudiante } from "../../api/updateEstudiante";
import CustomForm from "../../components/CustomForm";

function ModificarEstudiante() {
	const { state } = useLocation();

	const navigate = useNavigate();

	const [nombre, setNombre] = useState(state.nombre);
	const [apellido, setApellido] = useState(state.apellido);
	const [año, setAño] = useState("");
	const [seccion, setSeccion] = useState("");
	const [open, setOpen] = useState(false);
	const [secciones, setSecciones] = useState("");

	const handleChange = (e) => {
		setAño(e.target.value);
	};

	const handleSeccion = (e) => {
		console.log(e.target);
		setSeccion(e.target.value);
	};

	useEffect(() => {
		const fetchSecciones = async () => {
			const SeccionesRes = await getSecciones();
			setSecciones(SeccionesRes);
			console.log(SeccionesRes);
		};

		fetchSecciones();
	}, []);

	const handleSubmit = async (e) => {
		setOpen(true);

		e.preventDefault();

		let seccion_id = "";
		secciones.map((sec) => {
			if (sec.codigo === seccion && sec.año === año) {
				seccion_id = sec.id;
			}
		});

		let response = await updateEstudiante(state.id, {
			nombre,
			apellido,
			seccion_id,
		});
		if (response.status == 200) {
			setOpen(true);
		}
	};

	return (
		<div>
			<Snackbar
				css={css`
					svg {
						color: white;
					}
				`}
				open={open}
				autoHideDuration={1000}
				onClose={() => setOpen(false)}
			>
				<Alert variant="filled" severity="success">
					Cuenta modificada satisfactoriamente
				</Alert>
			</Snackbar>

			<GoBackButton to={"prev"} />
			<h2>Administración de estudiantes</h2>
			<h3>Modificando cuentas</h3>
			<h3>Modificando información de la cuenta</h3>

			<CustomForm id="login" method="post" onSubmit={handleSubmit}>
				<FormControl className="item">
					<InputLabel id="label-año"> Año </InputLabel>
					<Select
						labelId="label-año"
						id="año"
						label="Año"
						value={año}
						onChange={handleChange}
						sx={{ minWidth: "230px" }}
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
						onChange={handleSeccion}
						sx={{ minWidth: "230px" }}
					>
						<MenuItem value={"A"}>A</MenuItem>
						<MenuItem value={"B"}>B</MenuItem>
						<MenuItem value={"C"}>C</MenuItem>
						<MenuItem value={"D"}>D</MenuItem>
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
						onChange={(e) => setNombre(e.target.value)}
						value={apellido}
					/>
				</FormControl>

				<div className="item">
					<Button variant="contained" type="submit">
						{" "}
						Guardar y Enviar{" "}
					</Button>
				</div>
			</CustomForm>
		</div>
	);
}

export default ModificarEstudiante;
