import { configureStore } from '@reduxjs/toolkit'


import mainReducer from './features/main'
import materias from './features/materias'
import evaluaciones from './features/evaluaciones'
import secciones from './features/secciones'
import profesorClases from './features/profesorClases'

export default configureStore({
  reducer: {
    main: mainReducer,
    materias : materias,
    evaluaciones: evaluaciones,
    secciones: secciones,
    profesorClases: profesorClases
  }
})