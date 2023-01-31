import React from 'react'
import Navbar from '../components/Navbar';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom'


function ADMIN_PROFESORES({datos}) {

    const[data,setData]=useState([]);

    const {state} = useLocation();

 /*  useEffect(() => {
        
        const fetchProfesores= async () => {
        
    axios.defaults.headers.common['Authorization'] = "Bearer " + "NjU.6L5VwGevxF-BNvrRFlItcVoKG4SFAwZE1b4RhzxjwyXwyl7ggx37oQZlUNwd";
        
        const profesoresRes = await getProfesores();
          setData(profesoresRes);
        };
       
        fetchProfesores();
      
      }, []);

*/

  return (
    <div>
      
      <Navbar names={state}   />

   <h2>Administrador de Profesores</h2>
   <h3>Listado de profesores</h3>
   <button>buscar</button>

   <br></br>

    </div>

  )
}

export default ADMIN_PROFESORES
