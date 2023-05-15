import axios from "axios";

export const getClases = ({seccionId}) => {
  return axios
    .get(`/admin/secciones/${seccionId}/clases`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};