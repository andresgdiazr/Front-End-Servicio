import axios from "axios";

export const deleteClase = (payload) => {
  const { claseId } = payload;
  return axios
    .delete(`/admin/clases/${claseId}`)
    .then((res) => res)
    .catch((err) => res.response);
};
