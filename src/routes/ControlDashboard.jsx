import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, List, ListItem, Button } from "@mui/material";
import GenericTitles from "components/GenericTitles";

function ControlDashboard() {
  const name = useSelector((state) => state.main.name);

  return (
    <>
      <GenericTitles
        title={`Bienvenido administrador ${name}`}
        newSubtitle="¿Qué desea hacer?"
      />
      <List>
        <ListItem>
          <Button
            data-cy="admin-link-profesores"
            component={Link}
            to="admin/profesores"
          >
            Administrar profesores
          </Button>
        </ListItem>

        <ListItem>
          <Button component={Link} to="admin/secciones">
            Administrar secciones
          </Button>
        </ListItem>

        <ListItem>
          <Button
            data-cy="admin-link-materias"
            component={Link}
            to="admin/materias"
          >
            Administrar materias
          </Button>
        </ListItem>

				<ListItem>
					<Button component={Link} to="/">
						Administrar administradores
					</Button>
				</ListItem>
			</List>
		</>
	);
}

export default ControlDashboard;
