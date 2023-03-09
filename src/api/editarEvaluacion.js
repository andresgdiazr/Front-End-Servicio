import axios from "axios";

export const editarEvaluacion = (payload) => {

  const {titulo,id} = payload
  return axios
    .patch(`/admin/evaluaciones/${id}`, {titulo} )
    .then((res) => res )
    .catch((err) => console.log(err))
};
