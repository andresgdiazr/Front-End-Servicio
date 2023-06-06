import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading, setSnackbar } from "store/features/main";
import { updateSeccion } from "api/updateSeccion";
import SeccionForm from "components/organisms/SeccionForm";
import { setSeccionData, useSeccionData } from "store/features/navigationData";
import SeccionesTitles from "components/SeccionesTitles";

function SeccionModificar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    const response = await updateSeccion(seccionId, data);
    dispatch(setLoading(false));
    if (response.status == 200) {
      dispatch(
        setSnackbar(["Sección modificada satisfactoriamente", "success"])
      );
      dispatch(setSeccionData(data));
      navigate(-1, { replace: true });
    } else {
      if (
        response.data.errors.some(
          (error) => error.field === "codigo" && error.rule === "unique"
        )
      ) {
        dispatch(setSnackbar(["Sección ya existente", "error"]));
      } else {
        dispatch(setSnackbar(["Error al modificar sección", "error"]));
      }
    }
  };

  const seccion = useSeccionData();
  const seccionId = seccion?.id;
	let defaultValues = {año: "", codigo: ""};

  if (seccion && seccion.año != defaultValues.año) {
    defaultValues = { año: seccion.año, codigo: seccion.codigo };
  }

  return (
    <>
      <>
        <SeccionesTitles newSubtitle="Modificar sección" />

        <SeccionForm onSubmit={onSubmit} defaultValues={defaultValues  ? defaultValues : undefined} />
      </>
    </>
  );
}

export default SeccionModificar;
