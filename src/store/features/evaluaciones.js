import { createSlice } from "@reduxjs/toolkit";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvaluaciones } from "../../api/getEvaluaciones";
import { setLoading } from "./main";

const evaluacionesSlice = createSlice({
  name: "evaluaciones",
  initialState: {
    materiaEvaluaciones: [],
  },
  reducers: {
    setEvaluaciones: (state, { payload }) => {
      const idx = state.materiaEvaluaciones.findIndex(
        (mat) => mat.id == parseInt(payload.materiaId)
      );
      if (idx != -1) {
        state.materiaEvaluaciones[idx].evaluaciones = payload.evaluaciones
      } else {
        state.materiaEvaluaciones.push({ id: payload.materiaId,evaluaciones: payload.evaluaciones});
      }
    },
    deleteEvaluacion: (state, { payload }) => {
      const matIdx = state.materiaEvaluaciones.findIndex( (mat) =>  mat.id == parseInt(payload.materiaId) )
      if (matIdx != -1) {
        const evIdx = state.materiaEvaluaciones[matIdx].evaluaciones.findIndex( ev => ev.id == parseInt(payload.evaluacionId) )
        if (evIdx != -1) {
          state.materiaEvaluaciones[matIdx].evaluaciones.splice(evIdx,1)
        }
      }
    },
    editEvaluacion: (state,{payload}) => {
      const matIdx = state.materiaEvaluaciones.findIndex( (mat) =>  mat.id == parseInt(payload.materiaId) )
      if (matIdx != -1) {
        const evIdx = state.materiaEvaluaciones[matIdx].evaluaciones.findIndex( ev => ev.id == parseInt(payload.evaluacionId) )
        state.materiaEvaluaciones[matIdx].evaluaciones[evIdx] = payload.evaluacion
      }
    },
    addEvaluacion: (state,{payload}) => {
      const matIdx = state.materiaEvaluaciones.findIndex( (mat) =>  mat.id == parseInt(payload.materiaId) )
      if (matIdx != -1) {
        state.materiaEvaluaciones[matIdx].evaluaciones.push(payload.evaluacion)
      }
    }
  },
});

export const { setEvaluaciones ,deleteEvaluacion ,addEvaluacion,editEvaluacion} = evaluacionesSlice.actions;

function useEvaluaciones(input) {
  const { materiaId, lapso } = input;
  const evaluaciones = useSelector((state) => {
    return state.evaluaciones.materiaEvaluaciones.find(
      (mat) => mat.id == parseInt(materiaId)
    );
  });

  const dispatch = useDispatch();

  useEffect(() => {
    
    if (evaluaciones === undefined) {
      dispatch(setLoading(true)); 
      getEvaluaciones({materiaId})
        .then((evs) =>
          dispatch(setEvaluaciones({ materiaId, evaluaciones:evs }))
        )
        .then(() => dispatch(setLoading(false)));
      
    }
  }, [evaluaciones]);


  const memoEvaluaciones = useMemo(
    () => {
      if( evaluaciones && evaluaciones.evaluaciones ) {
        return evaluaciones.evaluaciones.filter((eva) => eva.lapso === parseInt(lapso))
      } else {
        return []
      }
    },
    [evaluaciones, lapso]
  );
  return memoEvaluaciones;
}

export { useEvaluaciones };

export default evaluacionesSlice.reducer;
