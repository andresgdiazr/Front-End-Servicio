import axios from "axios";

export const createCuenta = (tipo, payload) => {

  const { nombre, apellido, email, cedula } = payload

  return axios
    .post(`/admin/${tipo}`, { nombre, apellido, email, cedula })
    .then((res) => res)
    .catch((err) => err.response)
};
