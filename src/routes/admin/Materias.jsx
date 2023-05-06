import { Typography, List, ListItem, Link } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

function Materias() {
	return (
		<>
			<Typography variant="h2">Administracion de materias</Typography>
			<Typography variant="subtitle1">Materias por año</Typography>

			<List>
				<ListItem>
					<Link
						component={RouterLink}
						to={`/dashboard-control/admin/materias/primero`}
					>
						Primer año
					</Link>
				</ListItem>
				<ListItem>
					<Link
						component={RouterLink}
						to={`/dashboard-control/admin/materias/segundo`}
					>
						Segundo año
					</Link>
				</ListItem>
				<ListItem>
					<Link
						component={RouterLink}
						to={`/dashboard-control/admin/materias/tercero`}
					>
						Tercer año
					</Link>
				</ListItem>
				<ListItem>
					<Link
						component={RouterLink}
						to={`/dashboard-control/admin/materias/cuarto`}
					>
						Cuarto año
					</Link>
				</ListItem>
				<ListItem>
					<Link
						component={RouterLink}
						to={`/dashboard-control/admin/materias/quinto`}
					>
						Quinto año
					</Link>
				</ListItem>
			</List>
		</>
	);
}

export default Materias;
