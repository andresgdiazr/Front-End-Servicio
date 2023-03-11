import axios from "axios";

export const updateProfesor = (id,payload) => {
  return axios
    .patch(`admin/profesores/${id}`,payload)
    .then((res) => res)
    .catch((err) => err.response);
};
