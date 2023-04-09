import {
	Select,
	MenuItem,
	Button,
	FormControl,
	InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import { Form, useParams } from "react-router-dom";
import { UpdateSeccion } from "../../api/updateSeccion";
import CustomForm from "../../components/CustomForm";

function SeccionModificar() {
	const [año, setAño] = useState("  ");
	const [codigo, setCodigo] = useState("   ");

	const { id } = useParams();

	const handleSubmit = async (e) => {
		e.preventDefault();

		let response = await UpdateSeccion(id, { año, codigo });
	};

	return (
		<>
			<h2>Administración de secciones</h2>
			<h3>Área de modificación</h3>

			{/* TODO no entender que ocurre aqui, no se modifica nada
				Aparte, los select no se muestran bien */}
				{/* Igual esto se debe cambiar por SeccionForm */}
			<CustomForm id="login" method="post" onSubmit={handleSubmit}>
				<FormControl>
					<InputLabel id="label-año">Año</InputLabel>
					<Select
						labelId="label-año"
						id="año"
						label="Año"
						value={año}
						sx={{ width: "227px" }}
						onChange={(e) => setAño(e.target.value)}
					>
						<MenuItem value={1}>1</MenuItem>
						<MenuItem value={2}>2</MenuItem>
						<MenuItem value={3}>3</MenuItem>
						<MenuItem value={4}>4</MenuItem>
						<MenuItem value={5}>5</MenuItem>
					</Select>
				</FormControl>

				<FormControl>
					<InputLabel id="label-seccion">Sección</InputLabel>
					<Select
						labelId="label-seccion"
						id="seccion"
						label="Seccion"
						value={codigo}
						sx={{ width: "227px" }}
						onChange={(e) => setCodigo(e.target.value)}
					>
						<MenuItem value={"A"}>A</MenuItem>
						<MenuItem value={"B"}>B</MenuItem>
						<MenuItem value={"C"}>C</MenuItem>
						<MenuItem value={"D"}>D</MenuItem>
					</Select>
				</FormControl>

				<Button variant="contained" type="submit">
					{" "}
					Guardar y Enviar{" "}
				</Button>
			</CustomForm>
		</>
	);
}

export default SeccionModificar;
