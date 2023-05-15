import axios from "axios";

export const updateCuenta = (type, id, payload) => {
  return axios
    .patch(`admin/${type}/${id}`, payload)
    .then((res) => res)
    .catch((err) => err.response);
};
