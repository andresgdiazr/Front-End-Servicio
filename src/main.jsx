import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import axios from 'axios'

import ControlDashboard from "./routes/ControlDashboard";
import Login from "./routes/Login";
import ProfesorDashboard from "./routes/ProfesorDashboard";
import AdminProfesores from "./routes/Admin_Profesor/AdminProfesores";
import ProfesorClases from "./routes/Admin_Profesor/ProfesorClases";
import Profesor_Modificar from "./routes/Admin_Profesor/Profesor_Modificar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./temaCoding";

import SeccionDashboard from "./routes/Seccion/SeccionDashboard";
import SeccionCrear from "./routes/Seccion/SeccionCrear";
import SeccionDetalles from "./routes/Seccion/SeccionDetalles";
import PaginaError from "./routes/PaginaError";
import Clase from "./routes/Profesor/Clase";

import ProfesorLayout from "./components/layouts/ProfesorLayout";
import ClaseEvaluaciones from "./routes/Profesor/ClaseEvaluaciones";
import Notas from "./routes/Profesor/Notas";
import AdminLayout from "./components/layouts/AdminLayout";
import AuthComponent from "./components/AuthComponent";


import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import Materias from "./routes/admin/Materias";
import MateriasPorAño from "./routes/admin/MateriasPorAño";



axios.defaults.baseURL = import.meta.env["VITE_API_URL"] || "http://164.90.211.190";

const router = createBrowserRouter([
	{
		path:'/',
		element: <AuthComponent />,
		children:[
			{
				path: "/login",
				element: <Login />,
				errorElement: <PaginaError />,
			},
			{
				path: "/dashboard-profesor",
				element: <ProfesorLayout />,
				children: [
					{ index:true, element: <ProfesorDashboard />},
					{ path:"clases/:id", element: <Clase />},
					{ path:"clases/:id/evaluaciones/:lapso", element: <ClaseEvaluaciones />},
					{ path:"clases/:id/evaluaciones/:evaluacionId/notas", element: <Notas />}
				]
			},
			{
				path: "/dashboard-control",
				element: <AdminLayout />,
				children: [
					{ index:true, element: <ControlDashboard />},
					{ path:"admin/profesores", element: <AdminProfesores />},
					{ path:"admin/profesores/:id/clases",element: <ProfesorClases />},
					{ path:"admin/profesores/:id/modificar",element: <Profesor_Modificar />},
					{ path:"admin/secciones", element: <SeccionDashboard /> },
					{ path:"admin/secciones/crear",element: <SeccionCrear />},
					{ path:"admin/secciones/:id", element: <SeccionDetalles />},
					{ path:"admin/materias", element: <Materias />},
					{ path:"admin/materias/year/:year", element: <MateriasPorAño />},

					

				]
			}
		]
	},
	
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store} >
		<ThemeProvider theme={theme}>
			<RouterProvider router={router} />
		</ThemeProvider>
	</Provider>
);
