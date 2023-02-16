import React from 'react'
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import SelectAÑo from '../../components/select/SelectAño';
function Seccion_Crear(){
    const {state}=useLocation();
    return(
        <div>
                <Navbar names={state}/>
        
            <br></br>
            <br></br>
                <Typography>Crear sección</Typography>
                
      <SelectAÑo />

        </div>
    );
};

export default Seccion_Crear;

