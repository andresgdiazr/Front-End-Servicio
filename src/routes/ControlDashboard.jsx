import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, List, ListItem, Link } from "@mui/material";

function ControlDashboard() {
	const name = useSelector((state) => state.main.name);
	return (
		<>
			<Typography variant="h1"> Bienvenido administrador {name} </Typography>
			<Typography> ¿Qué desea hacer? </Typography>
			<List>
				<ListItem>
					<Link component={RouterLink} to="admin/profesores">
						Administrar Profesores
					</Link>
				</ListItem>

				<ListItem>
					<Link component={RouterLink} to="admin/secciones">
						Administrar secciones
					</Link>
				</ListItem>

				<ListItem>
					<Link component={RouterLink} to="admin/materias">
						Administrar materias
					</Link>
				</ListItem>

				<ListItem>
					<Link component={RouterLink} to="/">
						Administrar supervisores
					</Link>
				</ListItem>

				<ListItem>
					<Link component={RouterLink} to="/">
						Administrar administradores
					</Link>
				</ListItem>
			</List>
		</>
	);
}

export default ControlDashboard;
