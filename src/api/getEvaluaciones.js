import axios from "axios";

export const getEvaluaciones = ({materiaId,lapso}) => {

  let route = `/materias/${materiaId}/evaluaciones`
  if (lapso) {
    route = `/materias/${materiaId}/evaluaciones?lapso=${lapso}`
  }

  return axios
    .get(route)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
