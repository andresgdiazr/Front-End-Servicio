import axios from 'axios';



export const getProfesores = () =>{
    return axios
    .get( 'http://localhost:3333/admin/profesores/2/clases')
    .then((res) => res.data)
    .catch((err) => console.log(err));

};