import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClases } from "api/getClases";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TablaBusqueda from "components/tables/GenericSearchTable";
import { useDispatch } from "react-redux";
import { setLoading } from "store/features/main";

function SeccionMaterias() {
	const [clases, setClases] = useState([]);
	const { id } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		const fetchProfesores = async () => {
			dispatch(setLoading(true))
			const clases = await getClases(id);
			dispatch(setLoading(false))
			setClases(clases);
		};

		fetchProfesores(); 
	}, []);

	const navigate = useNavigate();

	const Acciones = ({ cell }) => {
		const clase = cell.row.original;

		return (
			<VisibilityIcon
				onClick={() =>
					navigate(`${clase.id}/lapsos-evaluaciones`, {
						state: {
							materia: clase.materia,
							clase: clase,
						},
					})
				}
			/>
		);
	};

	return (
		<>
			<Typography> Adminstración de secciones</Typography>
			<Typography>Listado de las clases de la seccion </Typography>
			<TablaBusqueda datos={clases} formato={MATERIAS} acciones={Acciones} />
		</>
	);
}

const MATERIAS = [
	{ Header: "Id", accessor: "materia.id" },
	{ Header: "Materias", accessor: "materia.nombre" },
	{ Header: "Acción", accessor: "acciones" },
];

export default SeccionMaterias;
