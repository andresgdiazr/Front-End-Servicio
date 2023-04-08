import React from "react";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import SelectAño from "../../components/Select/SelectAño";

function SeccionCrear() {
	const { state } = useLocation();
	return (
		<div>
			<Typography>Crear sección</Typography>

			<SelectAño />
		</div>
	);
}

export default SeccionCrear;
