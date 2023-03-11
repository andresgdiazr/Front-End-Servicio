import axios from "axios";

export const getEstudiantes = (id) => {
    return axios
        .get(`/admin/secciones/${id}/estudiantes`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
};