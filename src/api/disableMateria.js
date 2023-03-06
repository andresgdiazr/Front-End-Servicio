import axios from "axios";

export const disableMateria = (id) => {
  return axios
    .patch(`/admin/materias/${id}`, {habilitado:false})
    .then((res) => res )
    .catch((err) => console.log(err))
};
