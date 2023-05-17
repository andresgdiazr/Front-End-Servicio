import { Typography } from "@mui/material";
import ProfesorTitleAdmin from "components/ProfesorTitleAdmin";
import React from "react";
import { useSelector } from "react-redux";

function ClaseInfo({ materia, año, seccion }) {
	const fullname = useSelector((state) => state.main.name);

	return (
		<>
			<ProfesorTitleAdmin prevSubtitles={[`${materia} año: ${año}`, `Sección: ${seccion}`]} />
		</>
	);
}

export default ClaseInfo;
