import React from 'react'
import Navbar from '../components/Navbar';
import { useNavigate} from 'react-router-dom'

function ControlDashboard() {
  
  const navigate = useNavigate();

    const Profesor = () => {
      navigate('/');
    }
  


  return (
    <div>

      <Navbar names={[["Profesor",Profesor],["Seccion",Profesor],["Materia",Profesor]]}
      />

      <h2>Bienvenido administrador Carlos</h2>
      <p> ¿Qué desea hacer?</p>

      <div>
      <button onClick={Profesor}>Administrar Profesores</button>
   
      <a>Adminsitrar secciones</a>
      <a>Administrar materias</a>
      </div>
      <br></br>

      <div>
      <a> Aministrar supervisor</a>
      <a> Administrar administrador</a>
      </div>
      <br></br>

      <a>Crear cuenta</a>
    </div>
  )
}

export default ControlDashboard