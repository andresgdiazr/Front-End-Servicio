import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { updateCuenta } from "../../api/updateCuenta";
import CuentaForm from "../../components/organisms/CuentaForm";
import { setLoading } from "../../store/features/main";
import { Alert, css, Snackbar } from "@mui/material";

function CuentaModificar({ tipo }) {
	const navigate = useNavigate();

	const [usedEmails, setUsedEmails] = useState([]);
	const [usedCedulas, setUsedCedulas] = useState([]);

	const { state } = useLocation();
	const [open, setOpen] = useState(false);

	const dispatch = useDispatch();

	const onSubmit = async (data) => {
		dispatch(setLoading(true));
		const response = await updateCuenta(tipo, state.id, data);
		if (response.status == 200) {
			setOpen(true);
			dispatch(setLoading(false));
			//; // Ir hacia atras, si se quita el comentario no se mostrara el snackbar
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
			<Snackbar
				css={css`
					svg {
						color: white;
					}
				`}
				open={open}
				autoHideDuration={1000}
				onClose={() => setOpen(false)}
			>
				<Alert variant="filled" severity="success">
					Cuenta modificada satisfactoriamente
				</Alert>
			</Snackbar>
			<h2>Administración de {tipo}</h2>
			<h3>Modificando información de la cuenta</h3>

			<CuentaForm
				onSubmit={onSubmit}
				usedEmails={usedEmails}
				usedCedulas={usedCedulas}
			/>
		</div>
	);
}

export default CuentaModificar;
