import React from 'react'
import Navbar from '../components/Navbar';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom'
import { INFO_PROFESORES } from '../components/tables/INFO_PROFESORES';
import TextField from "@mui/material/TextField";
import axios from 'axios';

function Admin_Profesores({datos}) {

    
    const {state} = useLocation();
    const[text,setText]=useState('');

    

        const inputHandler = ({target}) =>{

      var lowerCase = target.value.toLowerCase();
      setText(lowerCase);

           }

  return (
    <div>

     
      <Navbar names={state}   />
     

      <h2>Administrador de Profesores</h2>
      <h3>Listado de profesores</h3>

      <br></br>

    
      <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Buscar profesores"
          onChange={inputHandler}
      />
      

      

      <br></br>
      <br></br>

      <INFO_PROFESORES input={text} navbar={state}/> 
      
    </div>

  )
}

export default Admin_Profesores
