import { createSlice } from "@reduxjs/toolkit";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClases } from "../../api/profesores_clases";
import { setLoading } from "./main";

const profesorClasesSlice = createSlice({
  name: "profesorClases",
  initialState: {
    profesores: [],
  },
  reducers: {
    setProfesorClases: (state, { payload: { profesorId, clases } }) => {
      const idx = state.profesores.findIndex(
        (p) => p.id == parseInt(profesorId)
      );

      if (idx != -1) {
        state.profesores[idx].clases = clases;
      } else {
        state.profesores.push({ id: profesorId, clases });
      }
    },
    removeClase: (state, { payload:{claseId} }) => {
      for( const profesor of state.profesores ) {
        if( profesor.clases.some( c => c.id == parseInt(claseId)) ) {
          profesor.clases = profesor.clases.filter( c => c.id != parseInt(claseId) )
        }
      }
    },
    editEvaluacion: (state, { payload }) => {
      const matIdx = state.materiaEvaluaciones.findIndex(
        (mat) => mat.id == parseInt(payload.materiaId)
      );
      if (matIdx != -1) {
        const evIdx = state.materiaEvaluaciones[matIdx].evaluaciones.findIndex(
          (ev) => ev.id == parseInt(payload.evaluacionId)
        );
        state.materiaEvaluaciones[matIdx].evaluaciones[evIdx] =
          payload.evaluacion;
      }
    },
    addClase: (state, { payload:{profesorId,clase} }) => {
      const profesor = state.profesores.find( p => p.id == parseInt(profesorId))
      if ( profesor ) {
        profesor.clases.push(clase)
      }
    },
  },
});

export const { setProfesorClases,removeClase,addClase } = profesorClasesSlice.actions;

function useProfesorClases({ profesorId }) {
  const profesor = useSelector((state) => {
    return state.profesorClases.profesores.find(
      (p) => p.id === parseInt(profesorId)
    );
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (profesor === undefined) {
      dispatch(setLoading(true));
      getClases(profesorId)
        .then((clases) =>
          dispatch(
            setProfesorClases({ profesorId: parseInt(profesorId), clases })
          )
        )
        .then(() => dispatch(setLoading(false)));
    }
  }, [profesor]);

  const memoClases = useMemo(() => {
    if (profesor && profesor.clases) {
      return profesor.clases;
    } else {
      return [];
    }
  }, [profesor]);
  return memoClases;
}

export { useProfesorClases };

export default profesorClasesSlice.reducer;
