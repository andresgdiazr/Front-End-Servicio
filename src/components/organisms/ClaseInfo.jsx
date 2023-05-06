import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function ClaseInfo({ materia, año, seccion }) {
	const fullname = useSelector((state) => state.main.name);

	return (
		<>
			<Typography variant="h1">
				{materia} , año: {año}
			</Typography>
			<Typography>Seccion: {seccion}</Typography>
			<Typography>Profesor: {fullname}</Typography>
		</>
	);
}

export default ClaseInfo;
