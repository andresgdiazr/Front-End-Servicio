import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function AcordionAños({ años }) {
	const navigate = useNavigate();
	// TODO otro archivo sin referencia, se puede borrar?
	return (
		<>
			{años.map((el) => {
				return (
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography>{`Año: ${el[0].año}`}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							{el.map((seccion) => (
								<Button
									variant="contained"
									component={Link}
									to={`/admin/secciones/${seccion.id}`}
								>
									{`Sección: ${seccion.codigo}`}
								</Button>
							))}
						</AccordionDetails>
					</Accordion>
				);
			})}
		</>
	);
}
