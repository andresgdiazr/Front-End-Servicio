import React, { useEffect, useState } from "react";
import { Container, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { getSecciones } from "../../api/secciones";
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

function SeccionDashboard() {
	const navigate = useNavigate();

	
	const { state } = useLocation();
	const [años, setAños] = useState([]);

	const handleClick = () => {
		navigate("crear", { state: state });
	};

	


	


	useEffect(() => {
		const fetchClases = async () => {
			const SeccionesRes = await getSecciones();
			
	
			
			const PrimerAño = SeccionesRes.filter((el) => {
				if (el.año === 1) {
					return el;
				}
			});

			const SegundoAño = SeccionesRes.filter((el) => {
				if (el.año === 2) {
					return el;
				}
			});

			const TerceroAño = SeccionesRes.filter((el) => {
				if (el.año === 3) {
					return el;
				}
			});

			const CuartoAño = SeccionesRes.filter((el) => {
				if (el.año === 4) {
					return el;
				}
			});

			const QuintoAño = SeccionesRes.filter((el) => {
				if (el.año === 5) {
					return el;
				}
			});

			setAños([
				...años,
				PrimerAño,
				SegundoAño,
				TerceroAño,
				CuartoAño,
				QuintoAño,
			]);

		};

		fetchClases();
	}, []);


	const SeccionItem = ({ seccion }) => {
		const navigate = useNavigate();
	  
		const handleOnClick = () => {
			navigate(`/dashboard-control/admin/secciones/${seccion.id}`, {
			  state: {
				año:seccion.año,
				seccion:seccion.codigo
			  },
			});
		  };
	  
		return (
		  <Box pl={4}>
			<ListItemButton>
			  <ListItemText onClick={handleOnClick} primary={` Seccion ${seccion.codigo}  `} />
			</ListItemButton>
		  </Box>
		);
	  };


	const AñoItem = ({ secciones }) => {
		const [expanded, setExpanded] = useState(false);
	  
		secciones.sort(function (a, b) {
			if (a.codigo < b.codigo) {
			  return -1;
			}
			if (a.codigo > b.codigo) {
			  return 1;
			}
			return 0;
		  });
		
		

		console.log(secciones);

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
				primary={`Año: ${secciones[0].año}`  
					
					 }
			  />
			</ListItem>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
			  <List component="div" disablePadding>
				{secciones.map((seccion) => (
				  <SeccionItem
					key={seccion.id}
					seccion={seccion}
				  />
				))}
			  </List>
			</Collapse>
		  </>
		);
	  };




	return (
		<>
			<List>
				{
					años.map( (año) =>(
						<AñoItem 
						key={año[0].año} 
						secciones={año}>
							{año[0].año}
						</AñoItem>
					))
				}
			</List>

			

			<Button onClick={handleClick}> Crear Nueva sección</Button>
		</>
	);
}

export default SeccionDashboard;
