import { createSlice } from "@reduxjs/toolkit";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSecciones } from "../../api/secciones";
import { setLoading } from "./main";

const mainSlice = createSlice({
  name: "secciones",
  initialState: {
    secciones: null
  },
  reducers: {
    setSecciones: (state, { payload }) => {
      state.secciones = payload.secciones;
    },
    // deleteMateria: (state, { payload }) => {
    //   state.materias = state.materias.filter((m) => m.id !== payload.id);
    // },
    // updateMateria: (state, { payload }) => {
    //   let materia = state.materias.find((mat) => mat.id == payload.id);
    //   materia.nombre = payload.nombre;
    //   materia.materia_padre_id = payload.materia_padre_id;
    // },
    // addMateria: (state, { payload }) => {
    //   state.materias.push(payload.newMateria);
    // },
  },
});

export const { setSecciones } =
  mainSlice.actions;

function useSecciones(año) {
  const secciones = useSelector((state) => state.secciones.secciones) ;
  const dispatch = useDispatch();

  useEffect(() => {
    if (secciones === null) {
      dispatch(setLoading(true));
      getSecciones()
        .then((secciones) => dispatch(setSecciones({ secciones })))
        .then(() => dispatch(setLoading(false)));
    }
  }, [secciones]);

  return secciones === null ? [] : secciones;
}

export { useSecciones };

export default mainSlice.reducer;
