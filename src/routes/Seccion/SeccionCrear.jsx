import React from "react";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import SeccionForm from "components/organisms/SeccionForm";

function SeccionCrear() {
  const { state } = useLocation();
  return (
    <div>
      <Typography>Crear sección</Typography>

      <SeccionForm />
    </div>
  );
}

export default SeccionCrear;
