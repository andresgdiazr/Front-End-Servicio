import React from "react";
import { Outlet } from "react-router-dom";
import GoBackButton from "../atoms/GoBackButton";

function AdminLayout() {
	return (
		<>
			<GoBackButton to="prev" />
			<Outlet />
		</>
	);
}

export default AdminLayout;
