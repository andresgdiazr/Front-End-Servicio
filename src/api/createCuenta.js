import axios from "axios";

export const createCuenta = (type, payload) => {
  if (type === "profesores" || type === "administradores") {
    const path = type === 'profesores' ? 'admin/profesores' : 'admin/control-accounts';

    return axios
      .post(`/${path}`, payload)
      .then((res) => res)
      .catch((err) => err.response)
  } else {
    throw new Error("Tried to do something not valid.")
  }
};
