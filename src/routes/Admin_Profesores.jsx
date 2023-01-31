import React from 'react'
import Navbar from '../components/Navbar';
import {useEffect, useState} from 'react';



function ADMIN_PROFESORES() {

    const[data,setData]=useState([]);

    useEffect(() => {
        
        const fetchProfesores= async () => {
        
    axios.defaults.headers.common['Authorization'] = "Bearer " + "NjU.6L5VwGevxF-BNvrRFlItcVoKG4SFAwZE1b4RhzxjwyXwyl7ggx37oQZlUNwd";
        
        const profesoresRes = await getProfesores();
          setData(profesoresRes);
        };
       
        fetchProfesores();
      
      }, []);



  return (
    <div>

   {   // <Navbar names={names} />    
   }

   <h2>Administrador de Profesores</h2>
   <h3>Listado de profesores</h3>
   <div>Recuadro de buscar</div>
   <button>buscar</button>

   {console.log(data)}
   <br></br>

    </div>

  )
}

export default ADMIN_PROFESORES
