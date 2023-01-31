import axios from 'axios';



export const getProfesores = () =>{
    return axios
    .get( 'http://localhost:3333/admin/profesores')
    .then((res) => res.data)
    .catch((err) => console.log(err));

};