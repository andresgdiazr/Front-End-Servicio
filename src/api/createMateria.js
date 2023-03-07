import axios from "axios";

export const createMateria = (payload) => {

  const {año,nombre,materiaPadreId} = payload
  return axios
    .post(`/admin/materias`, {año,nombre,materiaPadreId} )
    .then((res) => res )
    .catch((err) => console.log(err))
};
