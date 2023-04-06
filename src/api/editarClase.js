import axios from "axios";

export const editarClase = ({claseId,materiaId,seccionId}) => {
  return axios
    .patch(`/admin/clases/${claseId}`,{
      materiaId,
      seccionId
    })
    .then((res) => res )
    .catch((err) => err.response)
};
