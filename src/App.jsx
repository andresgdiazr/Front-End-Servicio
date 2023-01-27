import reactLogo from './assets/react.svg'

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

import {Link} from 'react-router-dom'

import axios from "axios"
import { useState } from "react"
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
  const handleSubmit = e => {
    // Prevent the default submit and page reload
    e.preventDefault()

    
   // Handle validations
    axios
      .post("http://localhost:3333/login", { email, password })
      .then(response => {
        console.log(response)
        // Handle response
      }).catch(err => console.log(err))
    
    
  }

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  return (
    <div>
      <form action="" id="login" method="post" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p className="item">
          <label for="email"> Email </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </p>
        <p className="item">
          <label for="password"> Password </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </p>
        <p className="item">
          <input type="submit" value="Login" />
        </p>

       
      </form>

      
      <Link to="/users">
             <p>go to users page</p>
       </Link> 
      

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
