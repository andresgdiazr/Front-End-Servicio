import { css } from "@emotion/react";
import { Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "../atoms/TextInput";

function ProfesorForm({
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      css={css`
        display: flex;
        flex-align: center;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <TextInput
        label="Nombre"
        placeholder="Jhon"
        id="profesor-nombre"
        reactHookProps={register("nombre", {
          validate: (value) =>
            !value.trim() ? "este campo es requerido" : true,
        })}
        error={errors?.nombre?.message}
      />
      <TextInput
        label="Apellido"
        placeholder="Doe"
        id="profesor-apellido"
        reactHookProps={register("apellido", {
          validate: (value) =>
            !value.trim() ? "este campo es requerido" : true,
        })}
        error={errors?.apellido?.message}
      />
      <TextInput
        label="Correo Electronico"
        placeholder="ejemplo@gmail.com"
        id="profesor-email"
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
      <TextInput
        label="Cedula"
        placeholder="11222333"
        id="profesor-cedula"
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
          (usedEmails.some((email) => email == watch("email"))
            ? "El email ya esta en uso"
            : "") ||
          (usedCedulas.some((cedula) => cedula == watch("cedula"))
            ? "Esta cedula ya esta asignada"
            : "")
        }
      />

      <Button
        css={css`
          align-self: center;
          margin-top: 1rem;
        `}
        variant="contained"
        type="submit"
      >
        Guardar y Enviar
      </Button>
    </form>
  );
}

export default ProfesorForm;
