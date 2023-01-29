import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import App from './App'
import ControlDashboard from './routes/ControlDashboard';
import Login from './routes/Login';
import ProfesorDashboard from './routes/ProfesorDashboard';


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
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <App/>
  <RouterProvider router={router}/>
  </React.StrictMode>,
)
