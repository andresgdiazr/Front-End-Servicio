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
import { ThemeProvider } from '@mui/material/styles';
import theme from './temaCoding'
import axios from 'axios';


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
    path:"/admin/profeores/:id/clases",
    element: <Profesor_Clases />,
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme} >
      <RouterProvider router={router}/>
    </ThemeProvider>
  </React.StrictMode>,
)
