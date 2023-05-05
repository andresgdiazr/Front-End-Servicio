import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function ClaseInfo({ materia, año, seccion }) {
	const fullname = useSelector((state) => state.main.name);

	return (
		<div
			css={css`
				h1 {
					margin: 1rem 0;
				}
				margin-bottom: 3rem;
				p {
					margin: 0.5rem 0;
				}
			`}
		>
			<Typography variant="h1">
				{materia} , año: {año}
			</Typography>
			<Typography>Seccion: {seccion}</Typography>
			<Typography>Profesor: {fullname}</Typography>
		</div>
	);
}

export default ClaseInfo;
