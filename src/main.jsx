import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'

import ControlDashboard from './routes/ControlDashboard';
import Login from './routes/Login';
import ProfesorDashboard from './routes/ProfesorDashboard';
import Admin_Profesores from './routes/Admin_Profesores';
import Profesor_Clases from './routes/Profesor_Clases';
import Profesor_Modificar from './routes/Profesor_Modificar';
import { ThemeProvider } from '@mui/material/styles';
import theme from './temaCoding'
import axios from 'axios';
import SeccionDashboard from './routes/Seccion/SeccionDashboard';
import Seccion_Crear from './routes/Seccion/Seccion_Crear'
import Seccion_Detalles from './routes/Seccion/Seccion_Detalles';

axios.defaults.baseURL = 'http://localhost:3333'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard-profesor", 
    element: <ProfesorDashboard />,
  },
  {
    path: "/dashboard-control",
    element: <ControlDashboard />,
  },
  {
    path:"/admin/profesores",
    element: <Admin_Profesores />,
  },
  {
    path:"/admin/profesores/:id/clases",
    element: <Profesor_Clases />,
  },
  {
    path:"/admin/profesores/:id/modificar",
    element: <Profesor_Modificar />
  },
  {
    path:"/admin/secciones",
    element: <SeccionDashboard />
  },
  {
    path:"/admin/secciones/crear",
    element: <Seccion_Crear />
  },
  {
    path:"/admin/secciones/:id",
    element: <Seccion_Detalles />
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(

    <ThemeProvider theme={theme} >
      <RouterProvider router={router}/>
    </ThemeProvider>
)
