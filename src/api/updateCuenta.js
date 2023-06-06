import axios from "axios";

export const updateCuenta = (type, id, payload) => {

  if (type === "profesores" || type === "administradores") {
    const path = type === 'profesores' ? 'admin/profesores' : 'admin/control-accounts';

    return axios
      .patch(`/${path}/${id}`, payload)
      .then((res) => res)
      .catch((err) => console.log(err));
  } else {
    throw new Error("Tried to do something not valid.")
  }
};
