import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  Typography,
  OutlinedInput,
} from "@mui/material";
import { getSecciones } from "api/secciones";
import { updateEstudiante } from "api/updateEstudiante";
import CustomForm from "components/CustomForm";
import { useDispatch } from "react-redux";
import { setLoading, setSnackbar } from "store/features/main";
import { Controller } from "react-hook-form";
import SeccionesTitles from "components/SeccionesTitles";

function ModificarEstudiante() {
  const { state } = useLocation();

  const [nombre, setNombre] = useState(state.nombre);
  const [apellido, setApellido] = useState(state.apellido);
  const [año, setAño] = useState(state.año);
  const [seccion, setSeccion] = useState("A");
  const [secciones, setSecciones] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // this fetches the secciones on first render
  useEffect(() => {
    const fetchSecciones = async () => {
      const seccionesRes = await getSecciones();
      const sec = seccionesRes.filter((sec) => sec.id == state.seccionId);
      setSeccion(sec[0].id);
      setSecciones(seccionesRes);
    };

    fetchSecciones();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await updateEstudiante(state.id, {
      nombre,
      apellido,
      seccion_id: seccion,
      año,
    });
    if (response.status == 200) {
      dispatch(
        setSnackbar(["Información de estudiante modificada satisfactoriamente", "success"])
      );
      navigate(-1);
    }
  };

  return (
    <>
			<SeccionesTitles newSubtitle="Modificando datos de estudiante"/>

      <CustomForm
        id="login"
        method="post"
        onSubmit={handleSubmit}
        sx={{ display: "grid", gap: 1 }}
      >
        <FormControl className="item">
          <Typography variant="body2">Año</Typography>
          <Select
            displayEmpty
            value={año}
            inputProps={{ "aria-label": "Without label" }}
            onChange={(e) => {
              if (secciones.length > 0) {
                const seccionesByYear = secciones.filter(
                  (sec) => sec.año == e.target.value
                );
                setSeccion(seccionesByYear[0].id);
              }
              setAño(e.target.value);
            }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>

        <FormControl className="item">
          <Typography variant="body2">Sección</Typography>
          <Select
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            value={seccion}
            onChange={(e) => setSeccion(e.target.value)}
          >
            {secciones.length > 0
              ? secciones
                  .sort((a, b) => (a.codigo < b.codigo ? -1 : 1))
                  .map((sec) => {
                    if (sec.año === año) {
                      return (
                        <MenuItem key={sec.id} value={sec.id}>
                          {sec.codigo}
                        </MenuItem>
                      );
                    }
                  })
              : ["A", "B", "C", "D"].map((sec) => (
                  <MenuItem key={sec} value={sec}>
                    {sec}
                  </MenuItem>
                ))}
          </Select>
        </FormControl>

        <FormControl className="item">
          <Typography variant="body2">Nombre</Typography>
          <OutlinedInput
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </FormControl>
        <FormControl className="item">
          <Typography variant="body2">Apellido</Typography>
          <OutlinedInput
            onChange={(e) => setApellido(e.target.value)}
            value={apellido}
          />
        </FormControl>

        <Button variant="contained" type="submit">
          Guardar y enviar
        </Button>
      </CustomForm>
    </>
  );
}

export default ModificarEstudiante;
