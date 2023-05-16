import axios from "axios";

export const uploadNotas = ({calificaciones,clase,evaluacion}) => {
  return axios
    .request({
      method: "PUT",
      url: `/profesor/clases/${clase}/evaluaciones/${evaluacion}/calificaciones`,
      data: { calificaciones },
    })
    .catch((err) => console.log(err));
};
