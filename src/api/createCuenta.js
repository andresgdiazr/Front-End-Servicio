import axios from "axios";

export const createCuenta = (type, payload) => {

  const { nombre, apellido, email, cedula } = payload

  return axios
    .post(`/admin/${type}`, { nombre, apellido, email, cedula })
    .then((res) => res)
    .catch((err) => err.response)
};
