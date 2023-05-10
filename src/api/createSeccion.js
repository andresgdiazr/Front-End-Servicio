import axios from "axios";

export const createSeccion = (payload) => {
  const { codigo, año } = payload

  return axios
    .patch(`/admin/secciones`, { codigo, año })
    .then((res) => res)
    .catch((err) => console.log(err))
};
