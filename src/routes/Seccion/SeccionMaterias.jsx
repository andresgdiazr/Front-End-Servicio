import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClases } from "api/getClases";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TablaBusqueda from "components/tables/GenericSearchTable";

function SeccionMaterias() {
	const [materias, setMaterias] = useState([]);
	const [clases, setClases] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		const fetchProfesores = async () => {
			const Res = await getClases(id);
			setClases(Res);
			Res.map(({ materia }) => {
				setMaterias((materias) => [...materias, materia]);
			});
		};

		fetchProfesores();
	}, []);

	const navigate = useNavigate();

	const Acciones = ({ cell }) => {
		return (
			<VisibilityIcon
				onClick={() =>
					navigate(`/dashboard-profesor/clases/${cell.value}`, {
						state: {
							materia: cell.row.original.materia,
							clase: cell.row.original,
						},
					})
				}
			/>
		);
	};

	return (
		<>
			<Typography> Adminstración de secciones</Typography>

			<Typography>Listado</Typography>

			<TablaBusqueda datos={clases} formato={MATERIAS} acciones={Acciones} />
		</>
	);
}

const MATERIAS = [
	{ Header: "Materias", accessor: "materia.nombre" },
	{ Header: "Acción", accessor: "acciones" },
];

export default SeccionMaterias;
