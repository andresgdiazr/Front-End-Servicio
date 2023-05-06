import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function ClaseInfo({ materia, año, seccion }) {
	const fullname = useSelector((state) => state.main.name);

	return (
		<>
			<Typography variant="h2">
				{materia}, año: {año}
			</Typography>
			<Typography variant="subtitle1">Seccion: {seccion}</Typography>
			<Typography variant="subtitle1">Profesor: {fullname}</Typography>
		</>
	);
}

export default ClaseInfo;
