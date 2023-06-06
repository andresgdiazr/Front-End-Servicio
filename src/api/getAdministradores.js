import axios from 'axios';

export const getAdministradores = () => {
    return axios
        .get('/admin/control-accounts')
        .then((res) => res.data)
        .catch((err) => console.log(err));
};