import axios from "axios";

export const disableEvaluacion = (id) => {
  return axios
    .patch(`/admin/evaluaciones/${id}`, { habilitado: false })
    .then((res) => res)
    .catch((err) => console.log(err));
};
