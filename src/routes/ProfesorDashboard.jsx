import React, { useEffect, useState } from 'react'
import axios from 'axios';

import Navbar from '../components/Navbar';

function ProfesorDashboard() {

  const [clases,setClase] = useState([])

  useEffect( () =>{
    axios
      .get('http://localhost:3333/profesor/materias')
      .then( (response) => console.log(response) )
  },[])


  return (
    <div>
      <Navbar names={["Datos","Casos"]} />





    </div>    
  )
}

export default ProfesorDashboard