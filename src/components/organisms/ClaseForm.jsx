import { Button, css } from "@mui/material";
import React, { useEffect } from "react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useMaterias } from "../../store/features/materias";
import { useSecciones } from "../../store/features/secciones";
import SelectInput from "../atoms/SelectInput";

function ClaseForm({ defaultValues = {}, onSubmit = () => null }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      año: "1",
      ...defaultValues,
    },
  });
  const año = parseInt(watch("año"));
  const seccion = parseInt(watch('seccion'))
  const materia = parseInt(watch('materia'))


  useEffect(()=>{
    register('seccionObj')
    register('materiaObj')
  },[register])


  useEffect(()=>{
    setValue('seccion','')
    setValue('materia','')
  },[año,setValue])

  const materias = useMaterias(año);
  const secciones = useSecciones();

  useEffect(()=>{
    setValue('seccionObj', secciones.find( s => s.id == seccion ) || {} )
  },[seccion,setValue])

  useEffect(()=>{
    setValue('materiaObj', materias.find( m => m.id == materia ) || {} )
  },[materia,setValue])



  const seccionPorAño = useMemo(
    () => secciones.filter((s) => s.año == año),
    [año, secciones]
  );

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
      <SelectInput
        label="Año"
        id="input-año"
        options={[
          { value: "1", display: "Primero Año" },
          { value: "2", display: "Segundo Año" },
          { value: "3", display: "Tercero Año" },
          { value: "4", display: "Cuarto Año" },
          { value: "5", display: "Quinto Año" },
        ]}
        reactHookProps={register("año")}
      />
      <SelectInput
        label="Materia"
        id="input-materia"
        options={[
          { value: "", display: "---Selecione una Materia---" },
          ...materias
            .sort((a, b) => (a === b ? 0 : a < b ? -1 : 1))
            .map((m) => ({ value: m.id, display: m.nombre })),
        ]}
        reactHookProps={register("materia",{required:'este campo es requerido'})}
        error={errors?.materia?.message}
      />
      <SelectInput
        label="Seccion"
        id="input-seccion"
        options={[
          { value: "", display: "---Selecione una Seccion---" },
          ...seccionPorAño
            .sort((a, b) => (a.codigo < b.codigo ? -1 : 1))
            .map((s) => ({ value: s.id, display: s.codigo })),
        ]}
        error={errors?.seccion?.message}

        reactHookProps={register("seccion",{required:'este campo es requerido'})}
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

export default ClaseForm;
