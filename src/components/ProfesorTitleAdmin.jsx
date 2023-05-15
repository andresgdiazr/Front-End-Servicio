import React from "react";
import { Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import GenericTitles from "components/GenericTitles";

function ProfesorTitleAdmin({ title = "", prevSubtitles = [], newSubtitle }) {
	// TODO hacerlo con REDUX

	const { state } = useLocation();
	const params = useParams();
	const profesor = state.profesores
		? state.profesores.find((p) => p.id === parseInt(params.id))
		: state.profesor;

	prevSubtitles.unshift(`Profesor: ${profesor.nombre} ${profesor.apellido}`);

	return (
		<GenericTitles
			title={!title ? "Administración de profesores" : title}
			prevSubtitles={prevSubtitles}
			newSubtitle={newSubtitle}
		/>
	);
}

export default ProfesorTitleAdmin;
