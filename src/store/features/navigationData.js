import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfesorById } from "api/getProfesorById";
import { setLoading, setSnackbar } from "./main";
import { useNavigate, useParams } from "react-router-dom";
import { getMaterias } from "api/getMaterias";
import { getSecciones } from "api/secciones";

const mainSlice = createSlice({
  name: "navigationData",
  initialState: {
    profesor: undefined,
    seccion: undefined,
    materia: undefined,
    lapso: undefined,
  },
  reducers: {
    setProfesorData: (state, { payload }) => {
      state.profesor = payload;
    },
    setSeccionData: (state, { payload }) => {
      state.seccion = payload;
    },
    setMateriaData: (state, { payload }) => {
      state.materia = payload;
    },
    setLapsoData: (state, { payload }) => {
      state.lapso = payload;
    },
  },
});

// TODO a lo mejor se puede hacer esto mejor con una funcion que reciba el tipo de dato que va a hacer fetch
export const { setProfesorData, setSeccionData, setMateriaData, setLapsoData } =
  mainSlice.actions;

function useProfesorData() {
  const profesorSelector = useSelector((state) => state.navigationData.profesor);
  const dispatch = useDispatch();
  const params = useParams();

  // Get the list of profesores and then find the one with the user ir in params
  useEffect(() => {
    if (profesorSelector === undefined) {
      dispatch(setLoading(true));
      getProfesorById(params.profesorId)
        .then((profesores) => profesores.find(
          (p) => p.id === parseInt(params.profesorId)
        ))
        .then((profesor) => {
          if (profesor) {
            dispatch(setProfesorData(profesor))
          }
          else { // maybe with async redux this would work and navigate?
            dispatch(setSnackbar(["El profesor de la url no existe", "warning"]));
            //const navigate = useNavigate();
            //navigate("/", { replace: true });
          }
        })
        .then(() => dispatch(setLoading(false)));
    }
  }, [profesorSelector]);

  return profesorSelector;
}

function useSeccionData() {
  const dispatch = useDispatch();
  useDispatch(setLoading(true));

  const seccionSelector = useSelector((state) => state.navigationData.seccion);
  const params = useParams();
  // Get the list of secciones and then find the one with the seccionId in params
  useEffect(() => {
    if (seccionSelector === undefined) {
      dispatch(setLoading(true));
      getSecciones()
        .then((secciones) => secciones.find(
          (p) => p.id === parseInt(params.seccionId)
        ))
        .then((seccion) => {
          if (seccion) {
            dispatch(setSeccionData(seccion))
          }
          else { // maybe with async redux this would work and navigate?
            dispatch(setSnackbar(["La sección de la url no existe", "warning"]));
            //const navigate = useNavigate();
            //navigate("/", { replace: true });
          }
        })
        .then(() => dispatch(setLoading(false)));
    }
  }, [seccionSelector]);

  return seccionSelector;
}

function useMateriaData() {
  const params = useParams();
  if (!params.materiaId) {
    return;
  }

  const materiaSelector = useSelector((state) => state.navigationData.materia);
  const dispatch = useDispatch();

  // Get the list of materias and then find the one with the seccionId in params
  useEffect(() => {
    if (!materiaSelector) {
      dispatch(setLoading(true));
      getMaterias()
        .then((materias) => materias.find(
          (p) => p.id === parseInt(params.materiaId)
        ))
        .then((materia) => {
          if (materia) {
            dispatch(setMateriaData(materia))
          }
          else { // maybe with async redux this would work and navigate?
            dispatch(setSnackbar(["La materia de la url no existe", "warning"]));
            //const navigate = useNavigate();
            //navigate("/", { replace: true });
          }
        })
        .then(() => dispatch(setLoading(false)));
    }
  }, [materiaSelector]);

  return materiaSelector;
}

function useLapsoData() {
  const params = useParams();
  if (!params.lapsoId) {
    return;
  }

  const lapsoSelector = useSelector((state) => state.navigationData.lapso);
  const dispatch = useDispatch();
//TODO redirigir lapsos
  // Get the list of lapsos and then find the one with the seccionId in params
  useEffect(() => {
    if (!lapsoSelector) {
      dispatch(setLoading(true));
      getLapso()
        .then((lapsos) => lapsos.find(
          (p) => p.id === parseInt(params.lapsoId)
        ))
        .then((lapso) => dispatch(setLapsoData(lapso)))
        .then(() => dispatch(setLoading(false)));
    }
  }, [lapsoSelector]);

  return lapsoSelector;
}

export { useProfesorData, useSeccionData, useMateriaData, useLapsoData };

export default mainSlice.reducer;
