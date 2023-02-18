import React from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
	const navigate = useNavigate();

	const Profesor = (ruta, datos) => {
		navigate(ruta, { state: datos });
	};

	const navbar = [
		["Profesor", "/admin/profesores"],
		["Seccion", "/admin/secciones"],
		["Materia", "/admin/profesores"],
	];

	return (
		<Container>
			<Navbar names={navbar} />

			<h2>Bienvenido administrador Carlos</h2>
			<p> ¿Qué desea hacer?</p>

			<div>
				<button
					onClick={() => {
						Profesor("/admin/profesores", navbar);
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
		</Container>
	);
}

export default AdminDashboard;
