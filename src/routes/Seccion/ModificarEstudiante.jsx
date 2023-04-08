import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Button, css, MenuItem, Select, Snackbar } from "@mui/material";
import { getSecciones } from "../../api/secciones";

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

		console.log(seccion_id);
		alert(seccion_id);
		/*let response = await updateProfesor(state.id, { nombre, apellido });
    if (response.status == 200) {
      setOpen(true);
    }*/
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

			<h2>Administración de estudiantes</h2>
			<h3>Modificando cuentas</h3>
			<h3>Modificando información de la cuenta</h3>

			<form id="login" method="post" onSubmit={handleSubmit}>
				<div className="item">
					<label htmlFor="nombre"> Año </label>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						label="año"
						value={año}
						onChange={handleChange}
					>
						<MenuItem value={1}>1</MenuItem>
						<MenuItem value={2}>2</MenuItem>
						<MenuItem value={3}>3</MenuItem>
						<MenuItem value={4}>4</MenuItem>
						<MenuItem value={5}>5</MenuItem>
					</Select>
				</div>

				<div className="item">
					<label htmlFor="nombre"> Sección </label>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						label="año"
						value={seccion}
						onChange={handleSeccion}
					>
						<MenuItem value={"A"}>A</MenuItem>
						<MenuItem value={"B"}>B</MenuItem>
						<MenuItem value={"C"}>C</MenuItem>
						<MenuItem value={"D"}>D</MenuItem>
					</Select>
				</div>

				<div className="item">
					<label htmlFor="nombre"> Nombre </label>
					<input
						name="nombre"
						id="nombre"
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
					/>
				</div>
				<div className="item">
					<label htmlFor="apellido"> Apellido </label>
					<input
						type="apellido"
						name="apellido"
						id="apellido"
						value={apellido}
						onChange={(e) => setApellido(e.target.value)}
					/>
				</div>

				<div className="item">
					<Button variant="contained" type="submit">
						{" "}
						Guardar y Enviar{" "}
					</Button>
				</div>
			</form>
		</div>
	);
}

export default ModificarEstudiante;
