import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getSecciones } from "api/secciones";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ExpandMore as ExpandMore,
  ExpandLess as ExpandLess,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setLoading } from "store/features/main";
import { setSeccionData } from "store/features/navigationData";
import GenericTitles from "components/GenericTitles";

function SeccionDashboard() {
  const [años, setAños] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchClases = async () => {
      dispatch(setLoading(true));
      const seccionesRes = await getSecciones();
      dispatch(setLoading(false));

      seccionesRes.sort((a, b) => (a.año > b.año ? 1 : -1));

      const PrimerAño = seccionesRes.filter((seccion) => seccion.año == 1);
      const SegundoAño = seccionesRes.filter((seccion) => seccion.año == 2);
      const TerceroAño = seccionesRes.filter((seccion) => seccion.año == 3);
      const CuartoAño = seccionesRes.filter((seccion) => seccion.año == 4);
      const QuintoAño = seccionesRes.filter((seccion) => seccion.año == 5);

      setAños([PrimerAño, SegundoAño, TerceroAño, CuartoAño, QuintoAño]);
    };

    fetchClases();
  }, []);

  const SeccionItem = ({ seccion }) => {
    const navigate = useNavigate();

    const handleOnClick = () => {
      dispatch(setSeccionData(seccion));
      navigate(`${seccion.id}`);
    };

    return (
      <>
        <Box onClick={handleOnClick} pl={4}>
          <ListItemButton>
            <ListItemText primary={` Seccion ${seccion.codigo}  `} />
          </ListItemButton>
        </Box>
      </>
    );
  };

  const AñoItem = ({ secciones }) => {
    const [expanded, setExpanded] = useState(false);
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
            primaryTypographyProps={{ component: "h3" }}
            primary={`Año: ${secciones[0].año}`}
          />
        </ListItem>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {secciones.map((seccion) => (
              <SeccionItem key={seccion.id} seccion={seccion} />
            ))}
          </List>
        </Collapse>
      </>
    );
  };

  return (
    <>
      <GenericTitles title="Administración de secciones" newSubtitle="Secciones por años:"/>
      <List>
        {años.map((año) => (
          <AñoItem key={año[0].año} secciones={año}>
            {año[0].año}
          </AñoItem>
        ))}
      </List>

      <Button variant="text" component={Link} to={`crear`}>
        Crear nueva sección
      </Button>
    </>
  );
}

export default SeccionDashboard;
