import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import GoBackButton from "../atoms/GoBackButton";

function NoRootLayout() {

	const location = useLocation()
	const navigate = useNavigate()


	useEffect(()=>{
		if(location.pathname == '/dashboard-control/admin') {
			navigate('/dashboard-control')
		}
	},[location])


	return (
		<>
			<GoBackButton to="prev" />
			<Outlet></Outlet>
		</>
	);
}

export default NoRootLayout;
