import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { Box, Paper } from "@mui/material";

function MainLayout({ routes }) {
	return (
		<>
			<Navbar names={routes} />
			<Box sx={{ padding: "1rem 2rem", maxWidth: "900px", m: "0 auto" }}>
				<Paper
					elevation={5}
					sx={{
						padding: "2rem 2rem",
						display: "flex",
						flexDirection: "column",
						rowGap: "1rem",
						"& Button, & a": { /* TODO si algun elemento que deba estar al inicio no lo esta es por esto */
							alignSelf: "flex-start",
						}
					}}
				>
					<Outlet />
				</Paper>
			</Box>
		</>
	);
}

export default MainLayout;
