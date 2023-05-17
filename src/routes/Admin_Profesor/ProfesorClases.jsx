import React, { useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import { useProfesorClases } from "store/features/profesorClases";
import TablaBusqueda from "components/tables/GenericSearchTable";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ProfesorTitleAdmin from "components/ProfesorTitleAdmin";
import { useProfesorData } from "store/features/navigationData";

function ProfesorClases() {
	const { state } = useLocation();
	const params = useParams();
	const clases = useProfesorClases({ profesorId: params.profesorId });
	const profesor = useProfesorData();

	return (
		<>
			<ProfesorTitleAdmin newSubtitle={"Clases"}/>

			<TablaBusqueda
				datos={clases}
				formato={CLASES}
				emptyMessage="No hay clases asignadas a este profesor"
				acciones={createAcciones({
					profesor,
				})}
			/>

			<Button
				variant="contained"
				component={Link}
				to={`crear`}
			>
				Añadir clase
			</Button>
		</>
	);
}

function createAcciones({ profesor }) {
	return ({ cell }) => {
		const claseId = cell.row.original.id;
		return (
			<>
				<Link to={`${claseId}`}
					state={{materia: cell.row.original.materia, clase: cell.row.original}}
				>
						<VisibilityIcon/>
				</Link>
				
				<Link
					to={`${claseId}/editar`}
					state={{ clase: cell.row.original }}
				>
					<EditIcon />
				</Link>
				<DeleteIcon
					onClick={async () => {
						dispatch(setLoading(true));
						const response = await deleteClase({ claseId });
						if (response.status === 204) {
							dispatch(removeClase({ claseId }));
						}
						dispatch(setLoading(false));
					}}
				/>
			</>
		);
	};
}

const CLASES = [
	{
		Header: "Materia",
		accessor: "materia.nombre",
	},
	{
		Header: "Año",
		accessor: "materia.año",
	},
	{
		Header: "Sección",
		accessor: "seccion.codigo",
	},
	{
		Header: "Acciónes",
		accessor: "acciones",
	},
];

export default ProfesorClases;
