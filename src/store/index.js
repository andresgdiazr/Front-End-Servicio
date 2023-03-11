import { configureStore } from '@reduxjs/toolkit'


import mainReducer from './features/main'
import materias from './features/materias'
import evaluaciones from './features/evaluaciones'

export default configureStore({
  reducer: {
    main: mainReducer,
    materias : materias,
    evaluaciones: evaluaciones
  }
})