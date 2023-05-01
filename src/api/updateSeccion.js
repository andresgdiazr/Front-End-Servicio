import axios from "axios";

export const UpdateSeccion = (id, payload) => {
  return axios
    .patch(`admin/secciones/${id}`, payload)
    .then((res) => res)
    .catch((err) => console.log(err));
};
