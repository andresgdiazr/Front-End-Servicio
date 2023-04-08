import axios from "axios";

export const updateEstudiante = (id,payload) => {
  return axios
    .patch(`admin/estudiantes/${id}`,payload)
    .then((res) => res)
    .catch((err) => console.log(err));
};


