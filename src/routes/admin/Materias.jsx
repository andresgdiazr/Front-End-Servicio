import { Typography, List, ListItem, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Materias() {
	return (
		<>
			<Typography variant="h2">Administracion de materias</Typography>
			<Typography variant="subtitle1">Materias por año</Typography>

			<List>
				<ListItem>
					<Button
						variant="text"
						component={Link}
						to={`/dashboard-control/admin/materias/primero`}
					>
						Primer año
					</Button>
				</ListItem>
				<ListItem>
					<Button
						variant="text"
						component={Link}
						to={`/dashboard-control/admin/materias/segundo`}
					>
						Segundo año
					</Button>
				</ListItem>
				<ListItem>
					<Button
						variant="text"
						component={Link}
						to={`/dashboard-control/admin/materias/tercero`}
					>
						Tercer año
					</Button>
				</ListItem>
				<ListItem>
					<Button
						variant="text"
						component={Link}
						to={`/dashboard-control/admin/materias/cuarto`}
					>
						Cuarto año
					</Button>
				</ListItem>
				<ListItem>
					<Button
						variant="text"
						component={Link}
						to={`/dashboard-control/admin/materias/quinto`}
					>
						Quinto año
					</Button>
				</ListItem>
			</List>
		</>
	);
}

export default Materias;
