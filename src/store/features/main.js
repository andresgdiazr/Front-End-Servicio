import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    name:''
  },
  reducers: {
    setName: (state,{payload}) => {
      state.name = payload
    },
  }
})

export const { setName } = mainSlice.actions

export default mainSlice.reducer