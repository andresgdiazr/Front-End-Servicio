import axios from 'axios';

export const getClases = (id) => {
    return axios
        .get(`http://localhost:3333/admin/profesores/${id}/clases`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
};