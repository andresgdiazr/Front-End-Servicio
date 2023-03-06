import {
  Button,
  css,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { editarMateria } from "../../api/editarMateria";
import GoBackButton from "../../components/atoms/GoBackButton";

function EditarMateria() {

  const naviagate = useNavigate()

  const {
    state: { materias, target },
  } = useLocation();
  const [materiaPadre, setMateriaPadre] = useState(target.materia_padre_id);
  const [nombre, setNombre] = useState(target.nombre);

  const onUpload = async (ev) => {
    ev.preventDefault();
    const response = await editarMateria(target.id, {
      nombre,
      materiaPadreId: materiaPadre == "Ninguna" ? null : materiaPadre,
    });



    if( response.status == 200 ) {
      naviagate(-1)
    }

  };

  return (
    <div
      css={css`
        h2 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        h1 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
      `}
    >
      <GoBackButton to="prev" />
      <Typography variant="h2">Administracion de materias</Typography>
      <Typography>Modificando la informacion de materia</Typography>
      <div
        css={css`
          margin-top: 1.5rem;
        `}
      >
        <form
          onSubmit={onUpload}
          css={css`
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          `}
        >
          <TextField
            variant="filled"
            css={css`
              width: 300px;
            `}
            label="nombre"
            value={nombre}
            onChange={(ev) => setNombre(ev.target.value)}
          />
          <FormControl
            variant="filled"
            css={css`
              margin-top: 1rem;
              width: 300px;
            `}
          >
            <InputLabel id="materia-padre"> Materia Padre </InputLabel>
            <Select
              labelId="materia-padre"
              value={materiaPadre}
              label="Nombre"
              onChange={(ev) => setMateriaPadre(ev.target.value)}
            >
              <MenuItem value={"Ninguna"}>Ninguna</MenuItem>
              {materias.filter( mat => mat.id != target.id ).map((mat) => (
                <MenuItem key={mat.id} value={mat.id}>
                  {mat.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            css={css`
              margin-top: 1.5rem;
            `}
            variant="contained"
            type="submit"
          >
            Guardar Cambios
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditarMateria;
