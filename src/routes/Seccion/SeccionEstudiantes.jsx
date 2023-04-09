import React from "react";
import { getEstudiantes } from "../../api/admin_estudiantes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import { Estudiantes_table } from "../../components/tables/EstudiantesTable";
import TablaBusqueda from "../../components/tables/TABLAUNICA";

function SeccionEstudiantes() {
	const { id } = useParams();

	const [text, setText] = useState("");
	const [estudiante, setEstudiante] = useState([]);

	const inputHandler = ({ target }) => {
		let lowerCase = target.value.toLowerCase();
		setText(lowerCase);
	};

	useEffect(() => {
		const fetchProfesores = async () => {
            let estudiantesRes = await getEstudiantes(id);

	

			let estudianteRes = estudiantesRes.map( (estudiante) => {
                return { ...estudiante, 'nombre':`${estudiante.nombre} ${estudiante.apellido}` }
            })
         
            
            setEstudiante(estudianteRes);
		};

		fetchProfesores();
	}, []);


	return (
		<>
			<br></br>

			<TextField
				id="outlined-basic"
				variant="outlined"
				fullWidth
				label="Buscar profesores"
				onChange={inputHandler}
			/>

			<br></br>
			<br></br>

			<TablaBusqueda input={text} datos={estudiante} nombre={"INFO_ESTUDIANTE"} />
		</>
	);
}

export default SeccionEstudiantes;
