import React from "react";
import { useNavigate } from "react-router-dom";

import { ArrowBack } from "@mui/icons-material";
import { Typography, Button } from "@mui/material";

function GoBackButton({ to }) {
	const navigate = useNavigate();
	return (
		<Button
			onClick={() =>
				to == "prev" ? navigate(-1, { replace: true }) : navigate(to)
			}
			// TODO: hay un error al volver hacia atras, es un warning de react-router-dom, deberia ser un Link de react-router-dom y no un button con js custom
			//component={Link}
			sx={{
				textTransform: "none",
				color: "black",
				fontWeight: "bold",
			}}
		>
			<ArrowBack sx={{ marginRight: "0.5rem" }} />
			<Typography> Volver </Typography>
		</Button>
	);
}

export default GoBackButton;
