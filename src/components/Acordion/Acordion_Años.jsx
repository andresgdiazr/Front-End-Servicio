import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Acordion_Años({años}) {
  return (
    <div>
        {console.log(años)}
    
     
     

        {
            años.map(el =>{
            
            return(<Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    
                    <Typography>{`Año: ${el[0].año}`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                 {
                    el.map( seccion =>(
                        <Typography>
                            {`Sección: ${seccion.codigo}`}
                            </Typography>
                    ))
                    }
                
             </AccordionDetails>
            </Accordion>
            );})
        }
        
      
    </div>
  );
}