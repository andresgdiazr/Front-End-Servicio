import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import TablaBusqueda from "components/tables/GenericSearchTable";

import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { useDatos } from "../../hooks/useDatos";
import { useProfesorData } from "store/features/navigationData";
import SeccionesTitles from "components/SeccionesTitles";

function SeccionEstudiantes() {
	const navigate = useNavigate();
	const [text, setText] = useState("");
	const { seccionId } = useParams();

	
	const { state: estudiante, setState: setEstudiante} = useDatos(`/admin/secciones/${seccionId}/estudiantes`);

	const inputHandler = ({ target }) => {
		let lowerCase = target.value.toLowerCase();
		setText(lowerCase);
	};

	const dispatch = useDispatch();


	const Acciones = ({ cell }) => {
		return (
			<EditIcon
				onClick={() => {
					navigate(`${cell.row.original.id}/modificar`, {
						state: {
							nombre: cell.row.original.nombre,
							apellido: cell.row.original.apellido,
							id: cell.row.original.id,
							año: cell.row.original.año, // TODO y lo de abajo
							seccionId: cell.row.original.seccion_id,
						},
					});
				}}
			/>
		);
	};

	return (
		<>
			<SeccionesTitles newSubtitle="Listado de estudiantes"/>
			
			<TextField
				id="outlined-basic"
				variant="outlined"
				label="Buscar estudiantes"
				onChange={inputHandler}
			/>

			<TablaBusqueda
				input={text}
				datos={estudiante}
				formato={INFO_ESTUDIANTE}
				acciones={Acciones}
			/>
		</>
	);
}

const INFO_ESTUDIANTE = [
	{
		Header: "Nombres y apellidos",
		accessor: "fullname",
	},
	{
		Header: "Cédula",
		accessor: "cedula",
	},
	{
		Header: "Acción",
		accessor: "acciones",
	},
];

export default SeccionEstudiantes;
