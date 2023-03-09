import axios from "axios";

export const getEvaluaciones = ({materiaId,lapso}) => {
  return axios
    .get(`/admin/materias/${materiaId}/evaluaciones/lapsos/${lapso}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
