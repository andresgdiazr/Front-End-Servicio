import axios from "axios";

export const getNotasOfSeccion = ({ lapso, seccionId }) => {
  return axios
    .get(`/admin/secciones/${seccionId}/notas/lapsos/${lapso}`)
    .then((res) => res.data)
    .catch((err) => err.response);
};
  