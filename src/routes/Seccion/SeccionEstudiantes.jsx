import React from "react";
import { getEstudiantes } from "api/admin_estudiantes";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import TablaBusqueda from "components/tables/GenericSearchTable";

import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { setLoading } from "store/features/main";
import { useDatos } from "../../hooks/useDatos";

function SeccionEstudiantes() {
	const { id } = useParams();

	const navigate = useNavigate();

	const [text, setText] = useState("");

	
	const { state: estudiante, setState: setEstudiante} = useDatos(`/admin/secciones/${id}/estudiantes`);
	


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
							año: cell.row.original.año,
							seccionId: cell.row.original.seccion_id,
						},
					});
				}}
			/>
		);
	};

	return (
		<>
			<TextField
				id="outlined-basic"
				variant="outlined"
				fullWidth
				label="Buscar profesores"
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
