import axios from 'axios';


export const getSecciones = () =>{
    return axios
    .get( 'http://localhost:3333/admin/secciones')
    .then((res) => res.data)
    .catch((err) => console.log(err));

};