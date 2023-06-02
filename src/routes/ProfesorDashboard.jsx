import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import theme from "mainTheme";

import {
  ExpandMore as ExpandMore,
  ExpandLess as ExpandLess,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "store/features/main";
import GenericTitles from "components/GenericTitles";

const SeccionItem = ({ clase, materia }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/dashboard-profesor/clases/${clase.id}`, {
      state: {
        materia: materia,
        clase: clase,
      },
    });
  };

  return (
    <Box pl={4}>
      <ListItemButton onClick={handleOnClick}>
        <ListItemText
          primary={` Sección ${clase.seccion.codigo}`}
          primaryTypographyProps={{ component: "a" }}
        />
      </ListItemButton>
    </Box>
  );
};

const MateriaItem = ({ materia }) => {
  const [expanded, setExpanded] = useState(false);
  const { año, nombre, clases } = materia;

  return (
    <>
      <ListItem
        sx={{
          minWidth: "32px",
          "&:hover": {
            color: theme.palette.primary.dark,
            "& svg": {
              color: theme.palette.primary.dark,
            },
          },
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <ListItemIcon>
          {expanded ? (
            <ExpandLess fontSize="large" />
          ) : (
            <ExpandMore fontSize="large" />
          )}
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ component: "h2" }}
          primary={`${nombre} , año : ${año} `}
        />
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="ol">
          {clases.map((clase) => (
            <SeccionItem
              key={clase.seccion.id}
              materia={materia}
              clase={clase}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};

function ProfesorDashboard() {
  const [materias, setMaterias] = useState([]);
  const name = useSelector((state) => state.main.name);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    axios
      .get("/profesor/materias")
      .then((response) => setMaterias(response.data))
      .then(() => dispatch(setLoading(false)))
      .catch((err) => dispatch(setLoading(false)));
  }, []);

  return (
    <>
      <GenericTitles
        title={`Bienvenido ${name}`}
        newSubtitle="Sus materias:"/>

      {materias.length > 0 ? (
        <List component="ol">
          {materias.map((materia) => (
            <MateriaItem key={materia.id} materia={materia} />
          ))}
        </List>
      ) : (
        <Typography sx={{ textAlign: "center", mt : 2,mb :1.5 , color: "grey" }} variant="h3">
          Actualmente no posee ninguna clase asignada para ninguna materia
        </Typography>
      )}
    </>
  );
}

export default ProfesorDashboard;
