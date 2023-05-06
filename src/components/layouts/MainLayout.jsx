import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { Box, Paper } from "@mui/material";

function MainLayout({routes}) {
	return (
		<>
			<Navbar names={routes} />
			<Box sx={{ padding: "1rem 2rem", maxWidth: "900px", m: "0 auto" }}>
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
			</Box>
		</>
	);
}

export default MainLayout;
