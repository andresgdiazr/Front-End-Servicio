import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ExpandMoreIcon,
  Divider,
  Hidden,
} from "@mui/material";
import { PlayArrowIcon, DeckIcon } from "@mui/icons-material";

const Listas = ({ contenidos }) => {
  return (
    <div>
      <List component="nav">
        {Object.keys(contenidos).map((contenido) => (
          <ListItem button>
            <ListItemIcon>
              <PlayArrowIcon></PlayArrowIcon>

              <ListItemText primary={`  ${contenido}`}></ListItemText>
            </ListItemIcon>
          </ListItem>
        ))}
      </List>

      {Object.keys(contenidos).map((contenido) => (
        <Accordion>
          <AccordionSummary
            startIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <PlayArrowIcon />
            <Typography>{contenido}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Listas;
