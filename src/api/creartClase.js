import axios from "axios";

export const crearClase = (payload) => {
  const { materiaId, seccionId, profesorId } = payload;
  return axios
    .post(`/admin/clases`, {
      materiaId,
      seccionId,
      profesorId,
    })
    .then((res) => res)
    .catch((err) => err.response);
};
