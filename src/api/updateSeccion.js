import axios from "axios";

export const updateSeccion = (id, payload) => {
  return axios
    .patch(`admin/secciones/${id}`, payload)
    .then((res) => res)
    .catch((err) => err.response);
};
