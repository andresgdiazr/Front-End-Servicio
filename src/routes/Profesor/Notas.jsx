import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import ClaseInfo from "../../components/organisms/ClaseInfo";
import NotasTable from "../../components/tables/NotasTable";
import { setLoading } from "../../store/features/main";

function Notas() {
	const [notas, setNotas] = useState([]);
	const dispatch = useDispatch();

	const {
		state: { clase, materia, evaluacion },
	} = useLocation();

	const fetchNotas = () => {
		dispatch(setLoading(true));
		axios
			.get(
				`/profesor/clases/${clase.id}/evaluaciones/${evaluacion.id}/calificaciones`
			)
			.then((response) => setNotas(response.data))
			.then(() => dispatch(setLoading(false)))
			.catch((err) => dispatch(setLoading(true)));
	};

	useEffect(() => {
		fetchNotas();
	}, []);

	return (
		<div>
			<ClaseInfo
				materia={materia.nombre}
				año={materia.año}
				seccion={clase.seccion.codigo}
			/>

			<NotasTable
				refetch={() => fetchNotas()}
				info={{ evaluacion, clase, materia }}
				data={notas.map((n) => ({
					estudianteId: n.estudianteId,
					fullname: n.nombre + " " + n.apellido,
					cedula: "V" + n.cedula,
					nota: n.puntaje === null ? "No Asignado" : n.puntaje,
				}))}
			/>
		</div>
	);
}

export default Notas;
