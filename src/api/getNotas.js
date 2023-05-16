import axios from "axios";

export const getNotas = ({ clase, evaluacion }) => {
  return axios
    .get(`/profesor/clases/${clase}/evaluaciones/${evaluacion}/calificaciones`)
    .then( response => response.data )
    .catch((err) => console.log(err));
};
