import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCuenta } from "api/createCuenta";
import CuentaForm from "components/organisms/CuentaForm";
import { setLoading, setSnackbar } from "store/features/main";
import { Typography } from "@mui/material";

function CuentaCrear({ type }) {
	const navigate = useNavigate();

	const [usedEmails, setUsedEmails] = useState([]);
	const [usedCedulas, setUsedCedulas] = useState([]);

	const dispatch = useDispatch();

	const onSubmit = async (data) => {
		dispatch(setLoading(true));
		const response = await createCuenta(type, data);
		dispatch(setLoading(false));
		if (response.status == 200) {
			dispatch(setSnackbar(["Profesor creado satisfactoriamente", "success"]));
			navigate(-1, { replace: true });
		} else {
			if (
				response.data.errors.some(
					(error) => error.field === "email" && error.rule === "unique"
				)
			) {
				setUsedEmails([...usedEmails, data.email]);
			}
			if (
				response.data.errors.some(
					(error) => error.field === "cedula" && error.rule === "unique"
				)
			) {
				setUsedCedulas([...usedCedulas, data.cedula]);
			}
		}
	};

	return (
		<>
			<Typography variant="h2">Administración de {type}</Typography>
			<Typography variant="subtitle1">Creacion de cuenta</Typography>

			<CuentaForm
				onSubmit={onSubmit}
				usedEmails={usedEmails}
				usedCedulas={usedCedulas}
			/>
		</>
	);
}

export default CuentaCrear;
