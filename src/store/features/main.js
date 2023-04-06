import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    name:'',
    loading:false
  },
  reducers: {
    setName: (state,{payload}) => {
      state.name = payload
    },
    setLoading: (state,{payload}) => {
      state.loading = payload
    },
  }
})

export const { setName ,setLoading} = mainSlice.actions

export default mainSlice.reducer