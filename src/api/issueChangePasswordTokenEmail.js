import axios from "axios";

export const issueChangePasswordTokenEmail = (id, type) => {
  if (type === "profesores" || type === "administradores") {
    const path = type === "profesores" ? "admin/profesores" : "admin/control-accounts";

    return axios
      .get(`/${path}/${id}/change-password-token`)
      .then((res) => res)
      .catch((err) => err.response)
  } else {
    throw new Error("Tried to do something not valid.")
  }
};
