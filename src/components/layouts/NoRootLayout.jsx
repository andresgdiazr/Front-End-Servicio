import React from "react";
import { Outlet } from "react-router-dom";
import GoBackButton from "../atoms/GoBackButton";
import { Paper } from "@mui/material";

function AdminLayout() {
	return (
		<>
			<GoBackButton to="prev" />
			<Paper elevation={5} sx={{ padding: "1rem 2rem", flexGrow:"1", }}>
				<Outlet />
			</Paper>
		</>
	);
}

export default AdminLayout;
