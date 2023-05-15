import { createSlice } from "@reduxjs/toolkit";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMaterias } from "api/getMaterias";
import { setLoading } from "./main";

const mainSlice = createSlice({
  name: "materias",
  initialState: {
    materias: [],
    fetched: false,
  },
  reducers: {
    setMaterias: (state, { payload }) => {
      state.materias = payload.materias;
      state.fetched = true;
    },
    deleteMateria: (state, { payload }) => {
      state.materias = state.materias.filter((m) => m.id !== payload.id);
    },
    updateMateria: (state, { payload }) => {
      let materia = state.materias.find((mat) => mat.id == payload.id);
      materia.nombre = payload.nombre;
      materia.materia_padre_id = payload.materia_padre_id;
    },
    addMateria: (state, { payload }) => {
      state.materias.push(payload.newMateria);
    },
  },
});

export const { setMaterias, deleteMateria, updateMateria, addMateria } =
  mainSlice.actions;

function useMaterias(año) {
  const materias = useSelector((state) => state.materias.materias);
  const fetched = useSelector((state) => state.materias.fetched);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) {
      dispatch(setLoading(true));
      getMaterias()
        .then((materias) => dispatch(setMaterias({ materias })))
        .then(() => dispatch(setLoading(false)));
    }
  }, [fetched]);
  const memoMaterias = useMemo(
    () => materias.filter((m) => m.año == año),
    [materias, año]
  );
  return memoMaterias;
}

export { useMaterias };

export default mainSlice.reducer;
