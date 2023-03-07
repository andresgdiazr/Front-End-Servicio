import { configureStore } from '@reduxjs/toolkit'


import mainReducer from './features/main'
import materias from './features/materias'

export default configureStore({
  reducer: {
    main: mainReducer,
    materias : materias
  }
})