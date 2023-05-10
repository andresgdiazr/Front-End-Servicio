import axios from "axios";

export const createSeccion = (payload) => {
  const { codigo, año } = payload

  return axios
    .post(`/admin/secciones`, { codigo, año })
    .then((res) => res)
    .catch((err) => err.response)
};
