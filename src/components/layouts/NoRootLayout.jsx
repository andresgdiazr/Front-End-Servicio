import React from "react";
import { Outlet } from "react-router-dom";
import GoBackButton from "../atoms/GoBackButton";

function NoRootLayout() {
	return (
		<>
			<GoBackButton to="prev" />
			<Outlet></Outlet>
		</>
	);
}

export default NoRootLayout;
