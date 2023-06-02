import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClases } from "api/getClases";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TablaBusqueda from "components/tables/GenericSearchTable";
import { useDispatch } from "react-redux";
import { setLoading } from "store/features/main";
import SeccionesTitles from "components/SeccionesTitles";

function SeccionMaterias() {
	const [clases, setClases] = useState([]);
	const { seccionId } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		const fetchProfesores = async () => {
			dispatch(setLoading(true))
			const clases = await getClases({seccionId: seccionId});
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
			<SeccionesTitles newSubtitle="Listado de las clases de la seccion"/>

			<TablaBusqueda datos={clases} formato={MATERIAS} acciones={Acciones} emptyMessage="No hay clases asignadas para esta seccion" />
		</>
	);
}

const MATERIAS = [
	{ Header: "Id", accessor: "materia.id" },
	{ Header: "Materias", accessor: "materia.nombre" },
	{ Header: "Acción", accessor: "acciones" },
];

export default SeccionMaterias;
