import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, List, ListItem, Button } from "@mui/material";

function ControlDashboard() {
	const name = useSelector((state) => state.main.name);
	return (
		<>
			<Typography variant="h2"> Bienvenido administrador {name} </Typography>
			<Typography variant="subtitle1"> ¿Qué desea hacer? </Typography>
			<List>
				<ListItem>
					<Button component={Link} to="admin/profesores">
						Administrar profesores
					</Button>
				</ListItem>

				<ListItem>
					<Button component={Link} to="admin/secciones">
						Administrar secciones
					</Button>
				</ListItem>

				<ListItem>
					<Button component={Link} to="admin/materias">
						Administrar materias
					</Button>
				</ListItem>

				<ListItem>
					<Button component={Link} to="/">
						Administrar supervisores
					</Button>
				</ListItem>

				<ListItem>
					<Button component={Link} to="/">
						Administrar administradores
					</Button>
				</ListItem>

				<ListItem>
					<Button component={Link} to="admin/años">
						Administrar años escolares
					</Button>
				</ListItem>
			</List>
		</>
	);
}

export default ControlDashboard;
