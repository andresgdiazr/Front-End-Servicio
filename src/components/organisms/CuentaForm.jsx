import { Button, FormControl, OutlinedInput, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "../atoms/TextInput";
import CustomForm from "../CustomForm";
import { NewTextInput } from "components/atoms/NewTextInput";

function CuentaForm({
  defaultValues = {},
  onSubmit = () => null,
  usedEmails = [],
  usedCedulas = [],
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  return (
    <CustomForm sx={{display:'grid',gap:1}} onSubmit={handleSubmit(onSubmit)}>
      
      <NewTextInput label="Nombre"
      placeholder="John" 
      reactHookProps={register("nombre", {
        validate: (value) =>
          !value.trim() ? "este campo es requerido" : true,
      })}
      error={errors?.nombre?.message}
      />



      <NewTextInput label="Apellido"
      placeholder="Doe"
      reactHookProps={register("apellido", {
        validate: (value) =>
          !value.trim() ? "este campo es requerido" : true,
      })}
      error={errors?.apellido?.message}
      />

      <NewTextInput label="Correo Electronico"
      placeholder="ejemplo@gmail.com"
      reactHookProps={register("email", {
        validate: (value) =>
          !value.trim() ? "este campo es requerido" : true,
        pattern: {
          value: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
          message: "correo invalido",
        },
      })}
      error={
        errors?.email?.message ||
        (usedEmails.some((email) => email == watch("email"))
          ? "El email ya esta en uso"
          : "")
      }
      />

      <NewTextInput label="Cedula"
      placeholder="123456"
      reactHookProps={register("cedula", {
        validate: (value) =>
          !value.trim() ? "este campo es requerido" : true,
        pattern: {
          value: /^[1-9]+[0-9]*$/,
          message: "cedula invalida",
        },
      })}
      error={
        errors?.cedula?.message ||
        (usedCedulas.some((cedula) => cedula == watch("cedula"))
          ? "Esta cedula ya esta asignada"
          : "")
      }
      />

      <Button data-cy="cuenta-submit" variant="contained" type="submit">
        Guardar y Enviar
      </Button>
    </CustomForm>
  );
}

export default CuentaForm;
