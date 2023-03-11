import axios from "axios";

export const crearCuentaProfesor = (payload) => {

  const {nombre,apellido,email,cedula} = payload

  return axios
    .post(`/admin/profesores`, {nombre,apellido,email,cedula} )
    .then((res) => res )
    .catch((err) => err.response)
};
