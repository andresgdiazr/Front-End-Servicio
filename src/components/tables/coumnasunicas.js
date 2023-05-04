const COLUMNAS = {
  INFO_PROFESOR: [
    {
      Header: "Nombre",
      accessor: "nombre",
    },
    {
      Header: "Apellido",
      accessor: "apellido",
    },
    {
      Header: "Cedula",
      accessor: "cedula",
    },

    {
      Header: "Correo",
      accessor: "email",
    },
    {
      Header: "Acciones",
      accessor: "acciones",
    },
  ],
  INFO_CLASE: [
    {
      Header: "Materia",
      accessor: "materia.nombre",
    },
    {
      Header: "Año",
      accessor: "materia.año",
    },
    {
      Header: "Sección",
      accessor: "seccion.codigo",
    },
    {
      Header: "Acción",
      accessor: "acciones",
    },
  ],
  INFO_ESTUDIANTE: [
    {
      Header: "Nombres y apellidos",
      accessor: "fullname",
    },
    {
      Header: "Cédula",
      accessor: "cedula",
    },
    {
      Header: "Acción",
      accessor: "acciones",
    },
  ],
};

export const getTabla = (nombre) => {
  for (var key in COLUMNAS) {
    if (key == nombre) return COLUMNAS[key];
  }
};
