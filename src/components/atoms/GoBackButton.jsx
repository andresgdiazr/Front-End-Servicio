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
			component="a"
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
