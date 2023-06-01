import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfesorById } from "api/getProfesorById";
import { setLoading } from "./main";
import { useParams } from "react-router-dom";
import { getMaterias } from "api/getMaterias";
import { getSecciones } from "api/secciones";

const mainSlice = createSlice({
  name: "navigationData",
  initialState: {
    profesor: undefined,
    seccion: undefined,
    materia: undefined,
    lapso: undefined,
    fetched: {
      profesor: false,
      seccion: false,
      materia: false,
      lapso: false,
    },
  },
  reducers: {
    setProfesorData: (state, { payload }) => {
      state.profesor = payload;
      state.fetched.profesor = true;
    },
    setSeccionData: (state, { payload }) => {
      state.seccion = payload;
      state.fetched.seccion = true;
    },
    setMateriaData: (state, { payload }) => {
      state.materia = payload;
      state.fetched.materia = true;
    },
    setLapsoData: (state, { payload }) => {
      state.lapso = payload;
      state.fetched.lapso = true;
    },
  },
});

// TODO a lo mejor se puede hacer esto mejor con una funcion que reciba el tipo de dato que va a hacer fetch
export const { setProfesorData, setSeccionData, setMateriaData, setLapsoData } =
  mainSlice.actions;

function useProfesorData() {
  const profesorSelector = useSelector((state) => state.navigationData.profesor);
  const fetched = useSelector((state) => state.navigationData.fetched.profesor);
  const dispatch = useDispatch();
  const params = useParams();

  // Get the list of profesores and then find the one with the user ir in params
  useEffect(() => {
    if (!fetched) {
      dispatch(setLoading(true));
      getProfesorById(params.profesorId)
        .then((profesores) => profesores.find(
          (p) => p.id === parseInt(params.profesorId)
        ))
        .then((profesor) => dispatch(setProfesorData(profesor)))
        .then(() => dispatch(setLoading(false)));
    }
  }, [fetched]);

  return profesorSelector;
}

function useSeccionData() {
  const seccionSelector = useSelector((state) => state.navigationData.seccion);
  const fetched = useSelector((state) => state.navigationData.fetched.seccion);
  const dispatch = useDispatch();
  const params = useParams();
  // Get the list of secciones and then find the one with the seccionId in params
  useEffect(() => {
    if (!fetched) {
      dispatch(setLoading(true));
      getSecciones()
        .then((secciones) => secciones.find(
          (p) => p.id === parseInt(params.seccionId)
        ))
        .then((seccion) => dispatch(setSeccionData(seccion)))
        .then(() => dispatch(setLoading(false)));
    }
  }, [fetched]);
  return seccionSelector;
}

function useMateriaData() {
  const params = useParams();
  if (!params.materiaId) {
    return;
  }

  const materiaSelector = useSelector((state) => state.navigationData.materia);
  const fetched = useSelector((state) => state.navigationData.fetched.materia);
  const dispatch = useDispatch();

  // Get the list of secciones and then find the one with the seccionId in params
  useEffect(() => {
    if (!fetched) {
      dispatch(setLoading(true));
      getMaterias()
        .then((materias) => materias.find(
          (p) => p.id === parseInt(params.materiaId)
        ))
        .then((materia) => dispatch(setMateriaData(materia)))
        .then(() => dispatch(setLoading(false)));
    }
  }, [fetched]);

  return materiaSelector;
}

function useLapsoData() {
  const params = useParams();
  if (!params.lapsoId) {
    return;
  }

  const lapsoSelector = useSelector((state) => state.navigationData.lapso);
  const fetched = useSelector((state) => state.navigationData.fetched.lapso);
  const dispatch = useDispatch();

  // Get the list of secciones and then find the one with the seccionId in params
  useEffect(() => {
    if (!fetched) {
      dispatch(setLoading(true));
      getLapso()
        .then((lapsos) => lapsos.find(
          (p) => p.id === parseInt(params.lapsoId)
        ))
        .then((lapso) => dispatch(setLapsoData(lapso)))
        .then(() => dispatch(setLoading(false)));
    }
  }, [fetched]);

  return lapsoSelector;
}

export { useProfesorData, useSeccionData, useMateriaData, useLapsoData };

export default mainSlice.reducer;
