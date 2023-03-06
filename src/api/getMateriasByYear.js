import axios from "axios";

export const getMateriasByYear = (year) => {
  return axios
    .get(`/admin/materias`)
    .then((res) => res.data.filter( m => m.año == year)  )
    .catch((err) => console.log(err))
};
