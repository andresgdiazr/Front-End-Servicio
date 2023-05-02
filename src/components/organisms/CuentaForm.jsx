import { Button, FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "../atoms/TextInput";
import CustomForm from "../CustomForm";

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
		<CustomForm onSubmit={handleSubmit(onSubmit)}>
				<TextInput
					label="Nombre"
					placeholder="Jhon"
					id="cuenta-nombre"
					reactHookProps={register("nombre", {
						validate: (value) =>
							!value.trim() ? "este campo es requerido" : true,
					})}
					error={errors?.nombre?.message}
				/>
				<TextInput
					label="Apellido"
					placeholder="Doe"
					id="cuenta-apellido"
					reactHookProps={register("apellido", {
						validate: (value) =>
							!value.trim() ? "este campo es requerido" : true,
					})}
					error={errors?.apellido?.message}
				/>
				<TextInput
					label="Correo Electronico"
					placeholder="ejemplo@gmail.com"
					id="cuenta-email"
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
					id="cuenta-cedula"
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

				<Button variant="contained" type="submit">
					Guardar y Enviar
				</Button>
		</CustomForm>
	);
}

export default CuentaForm;
