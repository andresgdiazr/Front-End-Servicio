import React from "react";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import SeccionForm from "components/organisms/SeccionForm";

function SeccionCrear() {
  const { state } = useLocation();
  return (
    <>
      <Typography>Crear sección</Typography>

      <SeccionForm />
    </>
  );
}

export default SeccionCrear;
