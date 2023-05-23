import axios from "axios";

export const updateCuenta = (type, id, payload) => {

  if ( type === 'profesores' ) {
    return axios
    .patch(`admin/profesores/${id}`,payload)
    .then((res) => res)
    .catch((err) => console.log(err));
  } else {
    throw new Error("Api call is not defined yet")
  }

};
