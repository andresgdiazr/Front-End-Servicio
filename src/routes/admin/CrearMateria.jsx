import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createMateria } from "api/createMateria";
import ErrorInput from "components/atoms/ErrorInput";
import { setLoading, setSnackbar } from "store/features/main";
import { addMateria, useMaterias } from "store/features/materias";
import añoToData from "utils/añoToData";
import CustomForm from "components/CustomForm";
import GenericTitles from "components/GenericTitles";

function CrearMateria() {
  const { year: año } = useParams();

  const materias = useMaterias(añoToData(año).value);
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const [materiaPadre, setMateriaPadre] = useState(null);
  const [nombre, setNombre] = useState("");

  const dispatch = useDispatch();

  const onSubmit = async (ev) => {
    ev.preventDefault();

    if (nombre.trim().length < 1) {
      setError(true);
      return;
    }
    dispatch(setLoading(true));
    const res = await createMateria({
      nombre,
      materiaPadreId: materiaPadre,
      año: añoToData(año).value,
    });

    if (res.status == 200) {
      dispatch(addMateria({ newMateria: res.data }));
      dispatch(setSnackbar(["Materia creada con exito", "success"]));
      navigate(-1);
    } else {
      // TODO handle this failure (or check that it is impossible to fail)
    }
    dispatch(setLoading(false));
  };

  return (
    <>
      <GenericTitles
        title="Administracion de materias"
        newSubtitle="Creación de materias"
      ></GenericTitles>

      <CustomForm onSubmit={onSubmit}>
        <ErrorInput
          show={error}
          message={"Se requiere el nombre de la materia"}
        />
        <TextField
          data-cy="materia-nombre-input"
          variant="filled"
          label="nombre"
          value={nombre}
          onChange={(ev) => {
            if (ev.target.value.trim().length > 0) {
              setError(false);
            }
            setNombre(ev.target.value);
          }}
        />
        <FormControl variant="filled">
          <InputLabel id="materia-padre"> Materia Padre </InputLabel>
          <Select
            labelId="materia-padre"
            value={materiaPadre === null ? "Ninguna" : materiaPadre}
            label="Nombre"
            onChange={(ev) => {
              setMateriaPadre(ev.target.value);
            }}
          >
            <MenuItem value={"Ninguna"}>Ninguna</MenuItem>
            {materias.map((mat) => (
              <MenuItem key={mat.id} value={mat.id}>
                {mat.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button data-cy="create-materia" variant="contained" type="submit">
          Guardar Cambios
        </Button>
      </CustomForm>
    </>
  );
}

export default CrearMateria;
