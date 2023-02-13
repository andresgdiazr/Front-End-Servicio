import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { getSecciones } from '../../api/secciones';

function SeccionDashboard() {

    var item ={
        "año":1,
        "secciones": ['a','b','c','d'],
    }
    const {state} = useLocation();
    const [secciones,setSecciones] = useState([])
   
    useEffect( () =>{

        const fetchClases= async () => {
            
            const ProfesoresRes= await getSecciones();
                ProfesoresRes.reverse();
            let numero=0;
            let objectjson;
            let band=0;
                ProfesoresRes.map(it =>{
                    if(it.año !== numero){
                        
                        console.log(secciones);
                        if (numero !== 0) {
                            setSecciones(objectjson);
                            band=1;
                        }
                        if(band ==1){
                            setSecciones(secciones.push(objectjson))
                        }

                        numero=it.año;
                        objectjson={"año":numero,
                        secciones: [],}
                        objectjson.secciones.push(it.codigo);
                    } 
                    else{
                        objectjson.secciones.push(it.codigo);
                    }
                    
                })

                
            };
           
            fetchClases();
            
      },[])

        console.log(secciones)
  return (

        
      
      <Container>
        <Navbar names={state} />
        <h1>qweqwe</h1>
        <h1>qweqwe</h1>
        <h1>qweqwe</h1>
        <h1>qweqwe</h1>

        <Typography> Bienvenido Mr pepe </Typography>
      </Container>
 
  )
}

export default SeccionDashboard;