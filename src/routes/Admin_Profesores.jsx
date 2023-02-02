import React from 'react'
import Navbar from '../components/Navbar';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom'
import { getProfesores } from '../api/profesores';
import { INFO_PROFESORES } from '../components/tables/INFO_PROFESORES';
import axios from 'axios';

function Admin_Profesores({datos}) {

    const[data,setData]=useState([]);
    const {state} = useLocation();

    useEffect(() => {
        const fetchProfesores= async () => {
        axios.defaults.headers.common['Authorization'] = "Bearer " + "NjU.6L5VwGevxF-BNvrRFlItcVoKG4SFAwZE1b4RhzxjwyXwyl7ggx37oQZlUNwd";
        
        const profesoresRes = await getProfesores();
          console.log(profesoresRes);
          setData(profesoresRes);
        };
       
        fetchProfesores();
      
    }, []);



  return (
    <div>

     
      <Navbar names={state}   />
     

      <h2>Administrador de Profesores</h2>
      <h3>Listado de profesores</h3>
      <button>buscar</button>

      <br></br>
      {console.log(data)}
      <INFO_PROFESORES datos={data} navbar={state}/> 
      
    </div>

  )
}

export default Admin_Profesores
