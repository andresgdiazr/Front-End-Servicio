import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField, Button } from "@mui/material";
import axios from 'axios';


export default function SelectAño() {
	const [año, setAño] = React.useState("");
	const [habilitado, setHabilitado] = React.useState(true);
	const handleChange = (e) => {
		setAño(e.target.value);
	};
	
	const [codigo,setCodigo] = React.useState("");

	const handleSubmit = (e) =>{
		e.preventDefault();

		

		axios
      .post("/admin/secciones",{año,codigo})
      .then(response => {
        console.log(response)
        // Handle response
      })
	  .catch(e => {
		console.log(e);
	  })

	}


	return (
		<FormControl fullWidth mt="100%"
		
		>

			<InputLabel id="demo-simple-select-label">Año</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={año}
				label="año"
				onChange={handleChange}
			>
				<MenuItem value={1}>1</MenuItem>
				<MenuItem value={2}>2</MenuItem>
				<MenuItem value={3}>3</MenuItem>
				<MenuItem value={4}>4</MenuItem>
				<MenuItem value={5}>5</MenuItem>
			</Select>

			<br></br>
			<TextField 
			id="outlined-basic" 
			label="Sección"
			variant="outlined" 
			value={codigo}
			onChange={ e=> setCodigo(e.target.value)}
			/>

			<br></br>
			<Button size="large" variant="contained" color="success"
			
			onClick={handleSubmit}>
				Crear sección
			</Button>
		</FormControl>
	);
}
