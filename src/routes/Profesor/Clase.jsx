import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ClaseInfo from "components/organisms/ClaseInfo";

import TablaBusqueda from "components/tables/GenericSearchTable";
import { Book, Visibility } from "@mui/icons-material";

function Clase() {
	const {
		state: { materia = '', clase },
	} = useLocation();

	console.log(materia);
	console.log(clase);
	
	const { id: claseId } = useParams();
	const materiaData = { materia, clase };
	return (
		<>
			<ClaseInfo
				materia={materia.nombre}
				año={materia.año}
				seccion={clase.seccion.codigo}
			/>

			<TablaBusqueda
				formato={LAPSO}
				datos={data}
				acciones={createAcciones(materiaData)}
			/>
		</>
	);
}

function createAcciones(materiaData) {
	return ({ cell }) => {
		return (
			<>
				<Link
					state={{ ...materiaData }}
					to={`lapsos/${cell.row.original.lapsoNumber}/evaluaciones`}
				>
					<Visibility />
				</Link>

				<Book />
			</>
		);
	};
}

const LAPSO = [
	{ Header: "Lapso", accessor: "lapso" },
	{ Header: "Acción", accessor: "acciones" },
];

const data = [
	{ lapso: "Lapso 1", lapsoNumber: 1 },
	{ lapso: "Lapso 2", lapsoNumber: 2 },
	{ lapso: "Lapso 3", lapsoNumber: 3 },
];

export default Clase;
