import { Typography } from "@mui/material";
import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import { TextField, Button } from "@mui/material";

function SeccionAñadir() {
	const FormatoCrearEstudiante = () => {
		const [codigo, setCodigo] = useState("");
		const [nombre, setNombres] = useState("");
		const [apellido, setApellidos] = useState("");

		const handleSubmit = (e) => {
			e.preventDefault();
			axios
				.post("/admin/secciones", { año, codigo })
				.then((response) => {
					// Handle response
				})
				.catch((e) => {
					console.log(e);
				});
		};

		return (
			<>
				<FormControl fullWidth mt="100%">
					<TextField
						id="outlined-basic"
						label="Nombres del estudiante"
						variant="outlined"
						value={codigo}
						onChange={(e) => setCodigo(e.target.value)}
					/>

					<br></br>
					<TextField
						id="outlined-basic"
						label="Apellidos del estudiante"
						variant="outlined"
						value={codigo}
						onChange={(e) => setCodigo(e.target.value)}
					/>

					<br></br>
					<TextField
						id="outlined-basic"
						label="Cédula del estudiante"
						variant="outlined"
						value={codigo}
						onChange={(e) => setCodigo(e.target.value)}
					/>

					<br></br>
					<Button
						size="large"
						variant="contained"
						color="success"
						onClick={handleSubmit}
					>
						Añadir estudiante
					</Button>
				</FormControl>
			</>
		);
	};

	return (
		<>
			<Typography>Administración de secciones</Typography>

			<Typography>Ingrese la información del nuevo estudiante</Typography>

			<FormatoCrearEstudiante />
		</>
	);
}

export default SeccionAñadir;
