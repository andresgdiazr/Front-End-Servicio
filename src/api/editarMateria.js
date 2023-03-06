import axios from "axios";

export const editarMateria = (id,payload) => {
  return axios
    .patch(`/admin/materias/${id}`, payload)
    .then((res) => res )
    .catch((err) => console.log(err))
};
