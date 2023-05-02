
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import ClaseInfo from "../../components/organisms/ClaseInfo";

import EvaluacionLapsoTable from "../../components/tables/EvaluacionLapsoTable";

function Clase() {
	const {
		state: { materia, clase },
	} = useLocation();
	const { id: claseId } = useParams();
	const materiaData = { materia, clase };
	return (
		<div>
			<ClaseInfo
				materia={materia.nombre}
				año={materia.año}
				seccion={clase.seccion.codigo}
			/>

			<EvaluacionLapsoTable claseId={claseId} materiaData={materiaData} />
		</div>
	);
}

export default Clase;
