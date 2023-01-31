import React from 'react'
import { getProfesores } from './api/profesores'
import { useEffect, useState} from 'react'
import axios from 'axios';

import { TablaMaterias } from './components/TablaMaterias';

function PRUEBAS_30_01() {


  const[ok,setok]=useState({});
  useEffect(() => {
    const fetchProfesores= async () => {
      axios.defaults.headers.common['Authorization'] = "Bearer " + "NjU.6L5VwGevxF-BNvrRFlItcVoKG4SFAwZE1b4RhzxjwyXwyl7ggx37oQZlUNwd";
      const profesoresRes = await getProfesores();
      setok(profesoresRes);
    };
    fetchProfesores();
  }, []);

  return (
    <div>
      <TablaMaterias datos={ok}/>
    </div>
  )
}


export default PRUEBAS_30_01