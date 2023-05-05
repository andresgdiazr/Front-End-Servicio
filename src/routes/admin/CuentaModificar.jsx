import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { updateCuenta } from "../../api/updateCuenta";
import CuentaForm from "../../components/organisms/CuentaForm";
import { setLoading, setSnackbar } from "../../store/features/main";
import { Typography } from "@mui/material";

function CuentaModificar({ tipo }) {
	const [usedEmails, setUsedEmails] = useState([]);
	const [usedCedulas, setUsedCedulas] = useState([]);

	const { state } = useLocation();
	const { id: profesorId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		dispatch(setLoading(false));
		const response = await updateCuenta(tipo, profesorId, data);
		dispatch(setLoading(false));
		if (response.status == 200) {
			dispatch(
				setSnackbar(["Cuenta modificada satisfactoriamente", "success"])
			);
			navigate("/dashboard-control/admin/profesores");
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

	let defaultValues = {};

	if (state.profesor) {
		defaultValues = state.profesor;
	}

	return (
		<>
			<Typography variant="h2">Administración de {tipo}</Typography>
			<Typography variant="h3">Modificando información de la cuenta</Typography>

			<CuentaForm
				onSubmit={onSubmit}
				usedEmails={usedEmails}
				usedCedulas={usedCedulas}
				defaultValues={defaultValues}
			/>
		</>
	);
}
export default CuentaModificar;
