import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ControlDashboard() {
	const navigate = useNavigate();

	const name = useSelector( state => state.main.name )

	const Profesor = (ruta, datos) => {
		navigate(ruta, { state: datos });
	};
	

	const navbar = [
		["Profesor", "/admin/profesores"],
		["Seccion", "/admin/secciones"],
		["Materia", "/admin/profesores"],
	];

	return (
		<div>
			<h1>  {2} </h1>
			<h2>Bienvenido administrador {name}</h2>
			<p> ¿Qué desea hacer? blabla </p>

			<div>
				<button
					onClick={() => {
						Profesor("admin/profesores", navbar);
					}}
				>
					Administrar Profesores
				</button>

				<a>Adminsitrar secciones</a>
				<a>Administrar materias</a>
			</div>
			<br></br>

			<div>
				<a> Aministrar supervisor</a>
				<a> Administrar administrador</a>
			</div>
			<br></br>

			<a>Crear cuenta</a>
		</div>
	);
}

export default ControlDashboard;
