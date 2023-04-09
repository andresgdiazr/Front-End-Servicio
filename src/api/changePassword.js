import axios from "axios";

export const changePassword = ({ token, password }) => {
  return axios
    .post(`/change-password`, {
      token,
      newPassword:password,
    })
    .then((res) => res)
    .catch((err) => err.response);
};
  