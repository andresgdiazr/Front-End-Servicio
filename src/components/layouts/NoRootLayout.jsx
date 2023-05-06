import React from "react";
import { Outlet } from "react-router-dom";
import GoBackButton from "../atoms/GoBackButton";
import { Paper } from "@mui/material";

function NoRootLayout() {
	return (
		<>
			<GoBackButton to="prev" />
			<Paper
				elevation={5}
				sx={{
					padding: "2rem 2rem",
					flexGrow: "1",
					maxWidth: {
						md: "900px",
					},
				}}
			>
				<Outlet />
			</Paper>
		</>
	);
}

export default NoRootLayout;
