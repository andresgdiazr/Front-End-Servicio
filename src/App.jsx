import reactLogo from './assets/react.svg'
import {getProfesores} from './api/profesores'
import {useEffect,useState} from 'react';
/*
import {Button, TextField, IconButton, List, Typography} from '@material-ui/core'
import DeleteIcon from  '@material-ui/icons/Delete'
import { Delete } from '@material-ui/icons'
import {Icon} from '@material-ui/core'
import { mergeClasses } from '@material-ui/styles'
import {makeStyles} from '@material-ui/core/styles'

import { ThemeProvider } from '@material-ui/core/styles'
import theme from './temaCoding'

import Navbar from './components/Navbar'
import Teacher from './info/Teacher'
import Listas from './components/Listas'

import { useState } from "react"
*/




/*
const useStyle = makeStyles({
  botonPersonalizado: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255,105,135, .3)',
    color: 'white',
    height: 48,
    padding:'0 30px',
  }
})
*/


function App() {

  const[Profesores,setProfesores]=useState([])

  useEffect(() => {
    const fetchProfesores= async () => {
      const profesoresRes = await getProfesores();
      setData(profesoresRes[0]);
      
      setProfesores(profesoresRes);
    };
   
    fetchProfesores();
    console.log(Profesores);
   
  }, []);

  return (
    <div>
      
      <div>Hola</div>
      
      

    </div>
  )
}

export default App



















/*

  <ThemeProvider theme={theme}>
    
    <Navbar names={ rol === 1 ? ["Página Principal","Profesorado","Secciones","Materias"] : ["Pagina Principal"]}/>
    
    
    
    </ThemeProvider>

     <Listas contenidos={Teacher.materias}>

      </Listas>

      {/*
      Object.keys(Teacher.materias).map(materia => (
          <Typography variant="h6">{materia}</Typography>
      ))
      */
/*



/*

*/


 /* <div>
      <Button>
      <DeleteIcon />
      </Button>

    <Button
      variant="contained">
      <DeleteIcon color="disabled" />
    </Button>

    <Button size="large">
      Send
      <Icon>
        add
      </Icon>
    </Button>
    
    <IconButton aria-label="delete">
      <Icon>
        delete
      </Icon>
    </IconButton>
    
    <Button
      variant="contained"
      color="secondary"
      endIcon={<DeleteIcon/>}
    >
      Volver
    </Button>
   */

    /*<div>
      <Typography variant="p" align="right" color="initial">
        dshjksahsdjkhjghgjgfgjhfghfgffdgfdhdghdgh
      </Typography>

    </div>*/

  /*  <div>
      <Button className={classes.botonPersonalizado}>
        Mi boton personalizado
      </Button>
    </div>
  */
