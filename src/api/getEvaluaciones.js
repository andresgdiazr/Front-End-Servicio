import axios from "axios";

export const getEvaluaciones = ({materiaId,lapso}) => {
  return axios
    .get(`/materias/${materiaId}/evaluaciones?lapso=${lapso}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
