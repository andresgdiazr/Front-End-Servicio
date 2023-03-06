import { configureStore } from '@reduxjs/toolkit'


import mainReducer from './features/main'

export default configureStore({
  reducer: {
    main: mainReducer
  }
})