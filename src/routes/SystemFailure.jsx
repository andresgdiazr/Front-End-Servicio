import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function SystemFailure() {
  return (
    <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" minHeight="100vh">
      <Typography sx={{fontSize:48}} variant="h1">Error de Sistema</Typography>

      <Typography variant="subtitle1">
        Ha ocurrido una falla inesperada con sistema intente mas tarde o
        contacte con el administrador
      </Typography>

      <Link to='/login' >
        <Button> Ir al login </Button>
      </Link>
    </Box>
  );
}

export default SystemFailure;
