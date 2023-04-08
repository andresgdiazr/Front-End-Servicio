import { Typography, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import { TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getSecciones } from "../../api/secciones";
import { useEffect } from "react";

function SeccionAñadir() {

	const {id} = useParams();
	const seccion_id=id;

	const FormatoCrearEstudiante = () => {

		const [cedula, setCedula] = useState("");
		const [nombre, setNombres] = useState("");
		const [apellido, setApellidos] = useState("");
		const [egresado,setEgresado] = useState(false);
		const [sexo, setSexo] = useState("");
		const [año, setAño] = useState("1");
		const [secciones,setSecciones] = useState("");

		useEffect(() => {
			const fetchSecciones = async () => {
			  const SeccionesRes = await getSecciones();
			  setSecciones(SeccionesRes);
			  console.log(SeccionesRes);
			};
		
			fetchSecciones();
		  }, []);
		  

		const handleSubmit = (e) => {
			e.preventDefault();

			
			secciones.map( (seccion) =>{
				if(seccion.id==id){
					setAño(seccion.año);
				}
			})
			
			axios
				.post(`/admin/estudiantes`, { 
					nombre,
					sexo,
					año,
					egresado,
					apellido, 
					cedula,
					seccion_id

					
				})
				.then((res) => {console.log("hola")})
				.catch(error => {
					if (error.response) {
					  console.log(error.response);
					}
				  })
		};

		return (
			<>
				<FormControl fullWidth mt="100%">

					<TextField
						id="outlined-basic"
						label="Nombres del estudiante"
						variant="outlined"
						
						onChange={(e) => setNombres(e.target.value)}
					/>

					<br></br>
					<TextField
						id="outlined-basic"
						label="Apellidos del estudiante"
						variant="outlined"
						
						onChange={(e) => setApellidos(e.target.value)}
					/>

					<br></br>
					<TextField
						id="outlined-basic"
						label="Cédula del estudiante"
						variant="outlined"
					
						onChange={(e) => setCedula(e.target.value)}
					/>

					<br></br>
					
					       <label htmlFor="Sexo"> Género </label>
					       <Select
									labelId="demo-simple-select-label"
				id="demo-simple-select"
				label="año"
									onChange={ (e) => { setSexo(e.target.value); console.log(e.target.value)}}
								value={sexo}	
									>
								
									<MenuItem value={`M`} defaultValue = "">M</MenuItem>
									<MenuItem value={`F`} defaultValue = "">F</MenuItem>
									
								  </Select>
							
							
					       
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
