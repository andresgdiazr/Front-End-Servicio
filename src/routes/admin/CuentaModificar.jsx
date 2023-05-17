import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { updateCuenta } from "api/updateCuenta";
import CuentaForm from "components/organisms/CuentaForm";
import { setLoading, setSnackbar } from "store/features/main";
import GenericTitles from "components/GenericTitles";

function CuentaModificar({ type }) {
	const [usedEmails, setUsedEmails] = useState([]);
	const [usedCedulas, setUsedCedulas] = useState([]);

	const { state } = useLocation();
	const { id: cuentaId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		dispatch(setLoading(false));
		const response = await updateCuenta(type, cuentaId, data);
		dispatch(setLoading(false));
		if (response.status == 200) {
			dispatch(
				setSnackbar(["Cuenta modificada satisfactoriamente", "success"])
			);
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

	let defaultValues = {};

	if (state.cuenta) {
		defaultValues = state.cuenta;
	}

	return (
		<>
			<GenericTitles
				title={`Administración de ${type}`}
				newSubtitle="Modificando información de la cuenta"
			/>

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
