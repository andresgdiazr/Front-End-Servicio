import { List, ListItem, Button } from "@mui/material";
import GenericTitles from "components/GenericTitles";
import React from "react";
import { Link } from "react-router-dom";

function Materias() {
	return (
		<>
			<GenericTitles title="Administración de materias" newSubtitle="Lista de materias por año"/>

			<List>
				<ListItem>
					<Button
						data-cy="link-materias-primero"
						variant="text"
						component={Link}
						to={`primero`}
					>
						Primer año
					</Button>
				</ListItem>
				<ListItem>
					<Button
						variant="text"
						component={Link}
						to={`segundo`}
					>
						Segundo año
					</Button>
				</ListItem>
				<ListItem>
					<Button
						variant="text"
						component={Link}
						to={`tercero`}
					>
						Tercer año
					</Button>
				</ListItem>
				<ListItem>
					<Button
						variant="text"
						component={Link}
						to={`cuarto`}
					>
						Cuarto año
					</Button>
				</ListItem>
				<ListItem>
					<Button
						variant="text"
						component={Link}
						to={`quinto`}
					>
						Quinto año
					</Button>
				</ListItem>
			</List>
		</>
	);
}

export default Materias;
