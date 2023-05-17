import React from "react";
import GenericTitles from "components/GenericTitles";
import { useProfesorData } from "store/features/navigationData";

function ProfesorTitleAdmin({ title = "", prevSubtitles = [], newSubtitle }) {
	const profesor = useProfesorData();
	if (profesor) { // TODO no hay una mejor solucion?
		prevSubtitles.unshift(`Profesor: ${profesor.nombre} ${profesor.apellido}`);
	}

	return (
		<GenericTitles
			title={!title ? "Administración de profesores" : title}
			prevSubtitles={prevSubtitles}
			newSubtitle={newSubtitle}
		/>
	);
}

export default ProfesorTitleAdmin;
