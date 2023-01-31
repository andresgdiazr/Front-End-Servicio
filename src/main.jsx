import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'

import App from './App'
import ControlDashboard from './routes/ControlDashboard';
import Login from './routes/Login';
import ProfesorDashboard from './routes/ProfesorDashboard';
import Admin_Profesores from './routes/Admin_Profesores';


import PRUEBAS_30_01 from './PRUEBAS_30_01_2023';



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
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    
  <RouterProvider router={router}/>
 {

 /*
 <PRUEBAS_30_01 />
<App/>*/
 }
 

  </React.StrictMode>,
)
