import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { editarClase } from "api/editarClase";
import ClaseForm from "components/organisms/ClaseForm";
import { setLoading, setSnackbar } from "store/features/main";
import { editClase } from "store/features/profesorClases";
import ProfesorTitleAdmin from "components/ProfesorTitleAdmin";

function EditarClase() {
	const { state } = useLocation();
	const params = useParams();

	const dispatch = useDispatch();

	const onSubmit = async (data) => {
		dispatch(setLoading(true));
		const response = await editarClase({
			claseId: params.claseId,
			materiaId: data.materia,
			seccionId: data.seccion,
		});
		dispatch(setLoading(false));

		if (response.status == 200) {
			dispatch(
				editClase({
					claseId: params.claseId,
					materia: data.materiaObj,
					seccion: data.seccionObj,
				})
			);
			dispatch(setSnackbar(["Clase modificada satisfactoriamente", "success"]));
		} else {
			if (
				response.data.errors.some(
					(e) => e.field === "all" && e.rule === "duplicate"
				)
			) {
				return "dup-error";
			}
		}
	};

	return (
		<>
			<ProfesorTitleAdmin
				prevSubtitles={["Administración de clases"]}
				newSubtitle={"Edición de clase"}
			/>

			<ClaseForm
				onSubmit={onSubmit}
				defaultValues={{
					año: state.clase.materia.año,
					seccion: state.clase.seccion_id.toString(),
					materia: state.clase.materia_id.toString(),
				}}
			/>
		</>
	);
}

export default EditarClase;
