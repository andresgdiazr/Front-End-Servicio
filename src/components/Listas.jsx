import React from "react";
import {
List,
ListItem,
ListItemIcon,
ListItemText,
Divider,
Hidden
}from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import DeckIcon from '@material-ui/icons/Deck'

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const Listas = ({contenidos}) =>{
    return(
        <div>
            <List component='nav'>
               
               {
                Object.keys(contenidos).map( contenido =>(
                    <ListItem button>
                    <ListItemIcon>
                        <PlayArrowIcon>

                        </PlayArrowIcon>

                        <ListItemText  primary={`  ${contenido}`}>

                        </ListItemText>
                    </ListItemIcon>
                </ListItem>
                    
                ))

               }
               
              
            </List>
           

        {
            Object.keys(contenidos).map( contenido =>(

                <Accordion>
                <AccordionSummary
                    startIcon={<ExpandMoreIcon/>}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <PlayArrowIcon/>
                  <Typography>{contenido}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
        

            ))
        }
           
        </div>
    )
}

export default Listas;