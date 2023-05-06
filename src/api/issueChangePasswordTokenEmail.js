import axios from "axios";

export const issueChangePasswordTokenEmail = (id) => {
  return axios
    .get(`/admin/profesores/${id}/change-password-token`)
    .then((res) => res )
    .catch((err) => err.response )
};
