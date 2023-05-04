import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    name:'',
    loading:false,
    success : {
      status: 'expired',
      message: ''
    }
  },
  reducers: {
    setSucess: (state,{payload}) => {
      if( payload === null ) {
        state.success.status = 'expired'
        return
      } else {
        state.success.status = 'recent'
        if ( typeof payload === 'string' ) {
          state.success.message = payload
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


export const { setName ,setLoading,setSucess } = mainSlice.actions


export default mainSlice.reducer