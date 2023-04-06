import axios from "axios";

export const getEvaluaciones = ({materiaId}) => {
  return axios
    .get(`/admin/materias/${materiaId}/evaluaciones`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
