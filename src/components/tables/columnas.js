const INFO_PROFESOR = [
    {
        Header: 'Nombre',
        accessor: 'nombre',
    },
    {
        Header: 'Apellido',
        accessor: 'apellido',
    },
    {
        Header: 'Correo',
        accessor: 'email',
    },
    {
        Header: 'Acciones',
        accessor: 'id',
    },
];

const INFO_CLASE = [
    {
        Header: 'Materia',
        accessor: 'materia.nombre',
    },
    {
        Header: 'Año',
        accessor: 'materia.año',
    },
    {
        Header: 'Sección',
        accessor: 'seccion.codigo',
    },
    {
        Header: 'Acción',
        accessor: 'okkjkhkjh',
    },
];

const INFO_ESTUDIANTE = [
    {
        Header: 'Nombres y apellidos',
        accessor: 'nombres',
    },
    {
        Header: 'Cédula',
        accessor: 'cedula',
    },
    {
        Header: 'Acción',
        accessor: 'accion',
    },
];


export { INFO_PROFESOR, INFO_CLASE, INFO_ESTUDIANTE };