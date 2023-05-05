import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    name:'',
    loading:false,
    snackbar : {
      status: 'expired',
      message: '',
      type: '', // error warning info success
      // TODO aparte de los tipos, modificar en el tema el componente alert
    }
  },
  reducers: {
    setSnackbar: (state, {payload}) => {
      if( payload === null ) {
        state.snackbar.status = 'expired'
        return
      } else {
        const [ message, type ] = payload
        console.log(message,type);
        state.snackbar.status = 'recent'
        if ( typeof message === 'string' && typeof type === 'string' ) {
          state.snackbar.message = message,
          state.snackbar.type = type
        }
      }
    },
    setName: (state,{payload}) => {
      state.name = payload
    },
    setLoading: (state,{payload}) => {
      state.loading = payload
    },
  }
})


export const { setName ,setLoading,setSnackbar } = mainSlice.actions


export default mainSlice.reducer