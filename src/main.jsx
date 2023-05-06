import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import axios from "axios";

import CuentaCrear from "./routes/admin/CuentaCrear";
import CuentaModificar from "./routes/admin/CuentaModificar";
import ControlDashboard from "./routes/ControlDashboard";
import Login from "./routes/Login";
import ProfesorDashboard from "./routes/ProfesorDashboard";
import AdminProfesores from "./routes/Admin_Profesor/AdminProfesores";
import ProfesorClases from "./routes/Admin_Profesor/ProfesorClases";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./mainTheme";

import SeccionDashboard from "./routes/Seccion/SeccionDashboard";
import SeccionCrear from "./routes/Seccion/SeccionCrear";
import SeccionDetalles from "./routes/Seccion/SeccionDetalles";
import PaginaError from "./routes/PaginaError";
import Clase from "./routes/Profesor/Clase";

import NoRootLayout from "components/layouts/NoRootLayout";
import ProfesorLayout from "components/layouts/ProfesorLayout";
import ClaseEvaluaciones from "./routes/Profesor/ClaseEvaluaciones";
import Notas from "./routes/Profesor/Notas";
import AdminLayout from "components/layouts/AdminLayout";
import AuthComponent from "components/AuthComponent";

import "./index.css";
import { Provider } from "react-redux";
import store from "./store";

import SeccionEstudiantes from "./routes/Seccion/SeccionEstudiantes";
import SeccionMaterias from "./routes/Seccion/SeccionMaterias";
import CrearEstudiante from "./routes/Seccion/CrearEstudiante";
import SeccionModificar from "./routes/Seccion/SeccionModificar";

import Materias from "./routes/admin/Materias";
import MateriasPorAño from "./routes/admin/MateriasPorAño";
import EditarMaterias from "./routes/admin/EditarMateria";
import CrearMateria from "./routes/admin/CrearMateria";
import LapsosMateria from "./routes/admin/LapsosMateria";
import MateriaEvaluaciones from "./routes/admin/MateriaEvaluaciones";
import CrearEvaluacion from "./routes/admin/CrearEvaluacion";
import EditarEvaluacion from "./routes/admin/EditarEvaluacion";
import SetPassword from "./routes/SetPassword";

import ModificarEstudiante from "./routes/Seccion/ModificarEstudiante";

import CrearClase from "./routes/admin/CrearClase";
import EditarClase from "./routes/admin/EditarClase";

axios.defaults.baseURL =
  import.meta.env["VITE_API_URL"] || "https://josesisprueba.life";

const router = createBrowserRouter([
  {
    path: "/set-password",
    element: <SetPassword />,
  },
  {
    path: "/",
    element: <AuthComponent />,
    children: [
      {
        path: "/login",
        element: <Login />,
        errorElement: <PaginaError />,
      },
      {
        path: "/dashboard-profesor",
        element: <ProfesorLayout />,
        children: [
          { index: true, element: <ProfesorDashboard /> },
          {
            path: "clases/:id",
            element: <NoRootLayout />,
            children: [
              { index: true, element: <Clase /> },
              {
                path: "lapsos/:lapso/evaluaciones",
                element: <ClaseEvaluaciones />,
              },
              {
                path: "lapsos/:lapso/evaluaciones/:evaluacionId/notas",
                element: <Notas />,
              },
            ],
          },
        ],
      },
      {
        path: "/dashboard-control",
        element: <AdminLayout />,
        children: [
          { index: true, element: <ControlDashboard /> },
          {
            path: "admin",
            element: <NoRootLayout />,
            children: [
              // Profesores
              { path: "profesores", element: <AdminProfesores /> },
              {
                path: "profesores/:id/modificar",
                element: <CuentaModificar tipo="profesores" />,
              },
              {
                path: "profesores/crear",
                element: <CuentaCrear tipo="profesores" />,
              },
              {
                path: "profesores/:id/clases",
                element: <ProfesorClases />,
              },
              // Clases de profesores
              {
                path: "profesores/:profesorId/clases/crear",
                element: <CrearClase />,
              },
              {
                path: "profesores/:profesorId/clases/:claseId/editar",
                element: <EditarClase />,
              },
              // Secciones
              { path: "secciones", element: <SeccionDashboard /> },
              { path: "secciones/crear", element: <SeccionCrear /> },
              { path: "secciones/:id", element: <SeccionDetalles /> },
              {
                path: "secciones/:id/modificar",
                element: <SeccionModificar />,
              },
              // Estudiante de seccion
              {
                path: "secciones/:id/estudiantes",
                element: <SeccionEstudiantes />,
              },
              {
                path: "secciones/:id/estudiantes/:id/modificar",
                element: <ModificarEstudiante />,
              },
              {
                path: "secciones/:id/añadir_estudiantes",
                element: <CrearEstudiante />,
              },
              // Materias de seccion
              {
                path: "secciones/:id/materias",
                element: <SeccionMaterias />,
              },

              { path: "materias", element: <Materias /> },
              { path: "materias/:year", element: <MateriasPorAño /> },
              {
                path: "materias/:year/:id/editar",
                element: <EditarMaterias />,
              },
              { path: "materias/:year/crear", element: <CrearMateria /> },

              {
                path: "materias/:year/:id/lapsos",
                element: <LapsosMateria />,
              },
              {
                path: "materias/:year/:id/lapsos/:lapso/evaluaciones",
                element: <MateriaEvaluaciones />,
              },
              {
                path: "materias/:year/:id/lapsos/:lapso/evaluaciones/crear",
                element: <CrearEvaluacion />,
              },
              {
                path: "materias/:year/:id/lapsos/:lapso/evaluaciones/:evaluacionId/editar",
                element: <EditarEvaluacion />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
