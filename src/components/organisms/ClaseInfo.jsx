import ProfesorTitleAdmin from "components/ProfesorTitleAdmin";
import React from "react";

function ClaseInfo({ materia, año, seccion }) {
	return (
		<>
			<ProfesorTitleAdmin
				prevSubtitles={[`${materia} año: ${año}`, `Sección: ${seccion}`]}
			/>
		</>
	);
}

export default ClaseInfo;
