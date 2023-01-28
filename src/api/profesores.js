import axios from 'axios';

export const getProfesores = () =>{
    return axios
    .get('http://localhost:3333/debug/materias')
    .then((res) => res.data)
    .catch((err) => console.log(err));

};