import axios from "axios";

export const getMaterias = () => {
  return axios
    .get(`/admin/materias`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
