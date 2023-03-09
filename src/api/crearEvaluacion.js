import axios from "axios";

export const crearEvaluacion = (payload) => {

  const {titulo,lapso,materiaId} = payload
  return axios
    .post(`/admin/evaluaciones`, {titulo,lapso,materiaId} )
    .then((res) => res )
    .catch((err) => console.log(err))
};
