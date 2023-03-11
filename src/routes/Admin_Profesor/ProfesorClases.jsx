import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, css, Typography } from "@mui/material";
import { getClases } from "../../api/profesores_clases";
import { useLocation } from "react-router-dom";
import { INFO_CLASES } from "../../components/Tables/INFO_CLASES";
import { getProfesores } from "../../api/profesores";
import GoBackButton from "../../components/atoms/GoBackButton";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/features/main";

function ProfesorClases() {
  const [clases, setClase] = useState([]);
  const [profesor, setProfesor] = useState([]);

  const params = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchClases = async () => {
      dispatch(setLoading(true));
      const ClasesRes = await getClases(params.id);
      const ProfesoresRes = await getProfesores();
      dispatch(setLoading(false));

      setProfesor(ProfesoresRes);
      setClase(ClasesRes);
    };

    fetchClases();
  }, []);

  return (
    <Container>
      <GoBackButton to={"prev"} />

      <h1>Administración de profesores</h1>

      <Typography>
        {profesor.map((element) => {
          if (element.id == params.id) {
            return `Clases del profesor:  ${element.nombre} ${element.apellido}`;
          }
        })}
      </Typography>

      <INFO_CLASES datos={clases} />

      <Button
        css={css`
          margin-top: 1rem;
        `}
        variant="contained"
      >
        Añadir clase
      </Button>
    </Container>
  );
}

export default ProfesorClases;
