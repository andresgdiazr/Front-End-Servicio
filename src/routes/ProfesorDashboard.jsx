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

import {
  ExpandMore as ExpandMore,
  ExpandLess as ExpandLess,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "store/features/main";

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
        <ListItemText primary={` Seccion ${clase.seccion.codigo}  `} />
      </ListItemButton>
    </Box>
  );
};

const MateriaItem = ({ materia }) => {
  const [expanded, setExpanded] = useState(false);
  const { año, nombre, clases } = materia;

  return (
    <>
      <ListItem disablePadding onClick={() => setExpanded(!expanded)}>
        <ListItemIcon style={{ minWidth: "32px" }}>
          {expanded ? (
            <ExpandLess fontSize="large" />
          ) : (
            <ExpandMore fontSize="large" />
          )}
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ fontSize: 20, component: "h3" }}
          primary={`${nombre} , año : ${año} `}
        />
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
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
    <div>
      <Typography variant="h5" fontWeight="normal" mt={1.5}>
        Bienvenido {name}
      </Typography>
      <Typography fontWeight="normal" mt={1} fontSize={16}>
        sus materias :
      </Typography>
      <List>
        {materias.map((materia) => (
          <MateriaItem key={materia.id} materia={materia} />
        ))}
      </List>
    </div>
  );
}

export default ProfesorDashboard;
