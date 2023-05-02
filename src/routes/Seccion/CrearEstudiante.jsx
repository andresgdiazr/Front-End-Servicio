import {
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getSecciones } from "../../api/secciones";
import { useEffect } from "react";
import CustomForm from "components/CustomForm";

import TextInput from "components/atoms/TextInput";
import SelectInput from "components/atoms/SelectInput";

import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setSucess } from "../../store/features/main";

function CrearEstudiante() {
  const { id: seccionId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sexo: "M",
    },
  });

  const [secciones, setSecciones] = useState("");

  useEffect(() => {
    const fetchSecciones = async () => {
      const SeccionesRes = await getSecciones();
      setSecciones(SeccionesRes);
    };

    fetchSecciones();
  }, []);
  const onSubmit = (data) => {

    const año = secciones.filter((s) => s.id == seccionId)[0].año;



    axios
      .post(`/admin/estudiantes`, {
        nombre: data.nombre,
        apellido: data.apellido,
        sexo: data.sexo,
        año,
        egresado: false,
        cedula: data.cedula,
        seccion_id: parseInt(seccionId),
      })
      .then((res) => {
        dispatch(setSucess('Estudiante creado correctamente'))    
        navigate(-1)
      })
      .catch((error) => {
        if (
          error.response.data?.errors.some(
            (e) => e.rule === "unique" && e.field == "cedula"
          )
        ) {
          setError("cedula-duplicate-error", {
            type: "custom",
            message: "Ya existe un estudiante con esta cedula",
          });
        }
      });
  };

  return (
    <>
      <Typography>Administración de secciones</Typography>
      <Typography>Ingrese la información del nuevo estudiante</Typography>

      <CustomForm onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Nombres del estudiante"
          placeholder="Pedro"
          id="student-name"
          reactHookProps={register("nombre", {
            validate: (value) =>
              !value.trim() ? "este campo es requerido" : true,
          })}
          error={errors?.nombre?.message}
        />

        <TextInput
          label="Apellidos del estudiante"
          placeholder="Perez"
          id="student-apellido"
          reactHookProps={register("apellido", {
            validate: (value) =>
              !value.trim() ? "este campo es requerido" : true,
          })}
          error={errors?.apellido?.message}
        />

        <TextInput
          label="Cedula del estudiante"
          placeholder="1234567"
          id="student-cedula"
          reactHookProps={register("cedula", {
            validate: (value) => {
              if (!value.trim()) {
                return "este campo es requerido";
              } else if (!/^\d+$/.test(value)) {
                return "cedula invalida";
              }

              return true;
            },
            onChange: () => clearErrors("cedula-duplicate-error"),
          })}
          error={
            errors?.cedula?.message ||
            errors?.["cedula-duplicate-error"]?.message
          }
        />

        <Controller
          control={control}
          name="sexo"
          render={({ field: { onChange, value, ref } }) => (
            <SelectInput
              label="Género"
              id="student-sexo"
              value={value}
              inputRef={ref}
              onChange={onChange}
              options={[
                { value: "M", display: "Masculino" },
                { value: "F", display: "Femenino" },
              ]}
            />
          )}
        />

        <Button size="large" variant="contained" color="success" type="submit">
          Añadir estudiante
        </Button>
      </CustomForm>
    </>
  );
}

export default CrearEstudiante;
