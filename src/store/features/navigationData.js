import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfesorById } from "api/getProfesorById";
import { setLoading } from "./main";
import { useParams } from "react-router-dom";

const mainSlice = createSlice({
  name: "navigationData",
  initialState: {
    profesor: undefined,
    seccion: {},
    materia: {},
    lapso: {},
    fetched: false, // TODO un solo fetched no es valido para todo
  },
  reducers: {
    setProfesorData: (state, { payload }) => {
      state.profesor = payload;
      state.fetched = true;
    },
    setSeccionData: (state, { payload }) => {
      state.seccion = payload;
      state.fetched = true;
    },
    setMateriaData: (state, { payload }) => {
      state.materia = payload;
      state.fetched = true;
    },
    setLapsoData: (state, { payload }) => {
      state.lapso = payload;
      state.fetched = true;
    },
  },
});

export const { setProfesorData, setSeccionData, setMateriaData, setLapsoData } =
  mainSlice.actions;

function useProfesorData() {
  const profesorSelector = useSelector((state) => state.navigationData.profesor);
  const fetched = useSelector((state) => state.navigationData.fetched);
  const dispatch = useDispatch();
  const params = useParams();

  // Get the list of profesores and then find the one with the user ir in params
  useEffect(() => {
    if (!fetched) {
      getProfesorById(params.profesorId)
        .then((profesores) => profesores.find(
          (p) => p.id === parseInt(params.profesorId)
        ))
        .then((profesor) => dispatch(setProfesorData(profesor)))
        .then(() => dispatch(setLoading(false)));
    }
  }, [fetched]);

  // TODO añadir un useMemo aqui?

  return profesorSelector;
}

export { useProfesorData };

export default mainSlice.reducer;
