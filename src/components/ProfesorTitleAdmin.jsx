import React from "react";
import GenericTitles from "components/GenericTitles";
import { useProfesorData } from "store/features/navigationData";
import { useSelector } from "react-redux";

function ProfesorTitleAdmin({ title = "", prevSubtitles = [], newSubtitle }) {
	// Change function if administrador or profesor
	const userType = sessionStorage.getItem("user-type");
	const profesor =
		userType === "Administrador"
			? useProfesorData()
			: useSelector((state) => state.main.name);

	return (
		<GenericTitles
			title={
				!title
					? userType === "Administrador"
						? "Administración de profesores"
						: "Información de materia"
					: title
			}
			prevSubtitles={[
				...(profesor
					? [
							`Profesor: ` +
								(userType === "Administrador"
									? `${profesor.nombre} ${profesor.apellido}`
									: profesor),
					  ]
					: []),
				...prevSubtitles,
			]}
			newSubtitle={newSubtitle}
		/>
	);
}

export default ProfesorTitleAdmin;
