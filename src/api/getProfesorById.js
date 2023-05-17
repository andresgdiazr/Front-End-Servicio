import axios from "axios";
// TODO esto es pura mentira, es copia de profesores.js. Habria que reemplazar esto si se añade un método get para un profesor por id en la db
export const getProfesorById = (id) => {
  return axios
    .get('/admin/profesores')
    .then((res) => res.data)
    .catch((err) => console.log(err));
};