import { Button, Typography, css } from "@mui/material";
import React, { useEffect } from "react";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMaterias } from "store/features/materias";
import { useSecciones } from "store/features/secciones";
import SelectInput from "components/atoms/SelectInput";
import CustomForm from "../CustomForm";

function ClaseForm({ defaultValues = {}, onSubmit = () => null }) {
	const {
		register,
		handleSubmit,
		watch,
		setError,
		clearErrors,
		control,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			año: "1",
			seccion: "",
			materia: "",
			...defaultValues,
		},
	});

	const año = parseInt(watch("año"));
	const seccion = parseInt(watch("seccion"));
	const materia = parseInt(watch("materia"));

	useEffect(() => {
		clearErrors("dup-error");
	}, [año, materia, seccion]);

	useEffect(() => {
		register("seccionObj");
		register("materiaObj");
	}, [register]);

	useEffect(() => {
		return () => {
			setValue("seccion", "");
			setValue("materia", "");
		};
	}, [año, setValue]);

	const materias = useMaterias(año);
	const secciones = useSecciones();

	useEffect(() => {
		setValue("seccionObj", secciones.find((s) => s.id == seccion) || {});
	}, [seccion, setValue]);

	useEffect(() => {
		setValue("materiaObj", materias.find((m) => m.id == materia) || {});
	}, [materia, setValue]);

	const seccionPorAño = useMemo(
		() => secciones.filter((s) => s.año == año),
		[año, secciones]
	);

	const internalOnSubmit = async (data) => {
		const error = await onSubmit(data);
		if (error === "dup-error") {
			setError("dup-error", {
				type: "custom",
				message: "Ya existe una clase con estos valores",
			});
		}
	};

	return (
		<CustomForm onSubmit={handleSubmit(internalOnSubmit)}>
			<Controller
				control={control}
				name="año"
				render={({ field: { onChange, value, ref } }) => (
					<SelectInput
						label="Año"
						id="input-año"
						value={value}
						inputRef={ref}
						onChange={onChange}
						options={[
							{ value: "1", display: "Primero Año" },
							{ value: "2", display: "Segundo Año" },
							{ value: "3", display: "Tercero Año" },
							{ value: "4", display: "Cuarto Año" },
							{ value: "5", display: "Quinto Año" },
						]}
					/>
				)}
			/>
			<Controller
				control={control}
				name="materia"
				render={({
					field: { onChange, value, ref },
					formState: { errors },
				}) => (
					<SelectInput
						label="Materia"
						id="input-materia"
						value={value}
						inputRef={ref}
						onChange={onChange}
						options={[
							{ value: "", display: "---Selecione una Materia---" },
							...materias
								.sort((a, b) => (a === b ? 0 : a < b ? -1 : 1))
								.map((m) => ({ value: m.id, display: m.nombre })),
						]}
						error={errors?.materia?.message}
					/>
				)}
				rules={{ required: "este campo es requerido" }}
			/>
			<Controller
				control={control}
				name="seccion"
				render={({
					field: { onChange, value, ref },
					formState: { errors },
				}) => (
					<SelectInput
						label="Seccion"
						id="input-seccion"
						value={value}
						inputRef={ref}
						onChange={onChange}
						options={[
							{ value: "", display: "---Selecione una Seccion---" },
							...seccionPorAño
								.sort((a, b) => (a.codigo < b.codigo ? -1 : 1))
								.map((s) => ({ value: s.id, display: s.codigo })),
						]}
						error={errors?.seccion?.message}
					/>
				)}
				rules={{ required: "este campo es requerido" }}
			/>

			{errors["dup-error"] && (
				<Typography sx={{ textAlign: "center", color: "#cc0000" }}>
					{errors["dup-error"]?.message}
				</Typography>
			)}

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
		</CustomForm>
	);
}

export default ClaseForm;
