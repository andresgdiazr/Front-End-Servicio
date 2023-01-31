import reactLogo from './assets/react.svg'
import {getProfesores} from './api/profesores'
import {useEffect,useState} from 'react';
import {TablaMaterias} from './components/TablaMaterias';

function App() {
  const[Profesores,setProfesores]=useState([])

  useEffect(() => {
    const fetchProfesores= async () => {
      const profesoresRes = await getProfesores();
      setProfesores(profesoresRes);
    };
    fetchProfesores();
  }, []);

  return (
    <div>
      <TablaMaterias datos={Profesores}/>
    </div>
  )
}
export default App


