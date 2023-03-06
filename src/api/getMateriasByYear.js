import axios from "axios";

export const getMateriasByYear = (year) => {
  return axios
    .get(`/admin/materias`)
    .then((res) =>
      res.data
        .filter((m) => m.año == year)
        .map((materia) => {
          return {
            ...materia,
            materia_padre_id:
              materia.materia_padre_id === null
                ? "Ninguna"
                : materia.materia_padre_id,
          };
        })
    )
    .catch((err) => console.log(err));
};
