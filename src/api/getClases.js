import axios from "axios";

export const getClases = (id) => {
  return axios
    .get(`/admin/clases/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};