import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCuenta } from "../../api/createCuenta";
import CuentaForm from "../../components/organisms/CuentaForm";
import { setLoading } from "../../store/features/main";
// TODO añadir snackbar
function CuentaCrear({ tipo }) {
	const navigate = useNavigate();

	const [usedEmails, setUsedEmails] = useState([]);
	const [usedCedulas, setUsedCedulas] = useState([]);

	const dispatch = useDispatch();

	const onSubmit = async (data) => {
		dispatch(setLoading(true));
		const response = await createCuenta(tipo, data);
		if (response.status == 200) {
			dispatch(setLoading(false));
			navigate(-1);
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
		dispatch(setLoading(false));
	};

	return (
		<div>
			<h2>Administración de {tipo}</h2>
			<h3>Creacion de cuenta</h3>

			<CuentaForm
				onSubmit={onSubmit}
				usedEmails={usedEmails}
				usedCedulas={usedCedulas}
			/>
		</div>
	);
}

export default CuentaCrear;
