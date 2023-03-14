import { Typography } from "@mui/material";
import React from "react";
import GoBackButton from "../../components/atoms/GoBackButton";

function SeccionMaterias() {

  useEffect(() => {
		const fetchProfesores = async () => {
            let estudiantesRes = await getEstudiantes(id);

		};

		fetchProfesores();
	}, []);

    

    return(
        <>
          <GoBackButton to="prev" />

          <Typography> Adminstración de secciones</Typography>

          <Typography>Listado</Typography>


        </>
    );
}

export default SeccionMaterias;