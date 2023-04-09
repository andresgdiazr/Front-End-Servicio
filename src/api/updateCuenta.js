import axios from "axios";

export const updateCuenta = (tipo, id, payload) => {
  return axios
    .patch(`admin/${tipo}/${id}`, payload)
    .then((res) => res)
    .catch((err) => err.response);
};
