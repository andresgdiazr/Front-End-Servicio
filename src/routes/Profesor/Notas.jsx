import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ClaseInfo from "components/organisms/ClaseInfo";

import { setLoading } from "store/features/main";
import TablaBusqueda from "components/tables/GenericSearchTable";
import { Button, Typography, css } from "@mui/material";
import { getNotas } from "api/getNotas";
import { uploadNotas } from "api/uploadNotas";

function Notas() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    state: { clase, materia, evaluacion },
  } = useLocation();

  // states
  const [notas, setNotas] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [notasToChange, setNotasToChange] = useState([]);

  const formato = useMemo(
    () => [
      { Header: "Nombres y Apellidos", accessor: "fullname" },
      { Header: "Cédula", accessor: "cedula" },
      {
        Header: "Nota",
        accessor: "nota2",
        Cell: createScoreCellComponent({ setNotasToChange, editMode }),
      },
    ],
    [editMode, setNotasToChange]
  );

  useEffect(() => {
    dispatch(setLoading(true));
    const response = getNotas({
      clase: clase.id,
      evaluacion: evaluacion.id,
    })
      .then((notas) => setNotas(notas))
      .finally(() => dispatch(setLoading(false)));
  }, []);

  const datos = notas.map((n) => ({
    estudianteId: n.estudianteId,
    fullname: n.nombre + " " + n.apellido,
    cedula: "V" + n.cedula,
    nota2: n.puntaje,

    nota: n.puntaje === null ? "No Asignado" : n.puntaje,
    122: "No Asignado",
  }));

  return (
    <>
      <ClaseInfo
        materia={materia.nombre}
        año={materia.año}
        seccion={clase.seccion.codigo}
      />

      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <Typography variant="h4">
          Cargar notas de {evaluacion.titulo}
        </Typography>

        {editMode ? (
          <div
            css={css`
              display: flex;
            `}
          >
            <Button
							sx={{ mr: 2 }}
              color="warning"
              variant="contained"
              onClick={() => setEditMode(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={async () => {
                const response = await uploadNotas({
                  calificaciones: notasToChange,
                  clase: clase.id,
                  evaluacion: evaluacion.id,
                });
                navigate(0, { replace: true });
              }}
              color="secondary"
              variant="contained"
            >
              Guardar
            </Button>
          </div>
        ) : (
          <Button variant="contained" onClick={() => setEditMode(true)}>
            Editar Notas
          </Button>
        )}
      </div>

      <TablaBusqueda datos={datos} formato={formato} />
    </>
  );
}
 

function createScoreCellComponent({ setNotasToChange, editMode }) {
  return function ScoreCell({ cell }) {
    const [componentValue, setComponentValue] = useState(cell.value);

    const onBlur = (e) => {
      if (!/^\d+\.?\d*$/.test(e.target.value)) {
        setComponentValue(cell.value);
        setNotasToChange((notas) => {
          return notas.filter(
            (n) => n.estudianteId != cell.row.original.estudianteId
          );
        });
        return;
      }

      const newValue =
        e.target.value > 20 ? 20 : e.target.value < 0 ? 0 : e.target.value;
      setComponentValue(newValue);
      setNotasToChange((notas) => {
        return [
          ...notas.filter(
            (n) => n.estudianteId != cell.row.original.estudianteId
          ),
          {
            estudianteId: cell.row.original.estudianteId,
            puntaje: newValue,
          },
        ];
      });
    };

    if (editMode) {
      return (
        <input
          css={css`
            width: 3rem;
          `}
          value={componentValue ?? ""}
          onChange={(e) => setComponentValue(e.target.value)}
          onBlur={onBlur}
        />
      );
    }

    if (cell.value) {
      return cell.value;
    }
    return "No Asignado";
  };
}

export default Notas;
