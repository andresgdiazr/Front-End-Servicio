import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button, FormControl, Typography, OutlinedInput } from "@mui/material";
import CustomForm from "../CustomForm";

function SeccionForm({
	defaultValues  = { año: "", codigo: "" },
	onSubmit = () => null,
}) {
	const [año, setAño] = useState(defaultValues.año);
	const [codigo, setSeccion] = useState(defaultValues.codigo);

	const [prevDefaults, setPrevDefaults] = useState(defaultValues);
	if (defaultValues.año != prevDefaults.año) {
		setPrevDefaults(defaultValues);
		setAño(defaultValues.año);
		setSeccion(defaultValues.codigo);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		onSubmit({ año, codigo });
	};
	return (
		<CustomForm onSubmit={handleSubmit}>
			<FormControl>
				<Typography variant="body2">Año</Typography>
				<Select
					value={año}
					displayEmpty
					inputProps={{ 'aria-label': 'Without label' }}
					onChange={(e) => {
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

			<Typography variant="body2">Sección</Typography>
			<OutlinedInput
				id="outlined-basic"
				label="Sección"
				variant="outlined"
				value={codigo}
				onChange={(e) => {
					setSeccion(e.target.value);
				}}
			/>

			<Button variant="contained" type="submit">
				Enviar
			</Button>
		</CustomForm>
	);
}

export default SeccionForm;
