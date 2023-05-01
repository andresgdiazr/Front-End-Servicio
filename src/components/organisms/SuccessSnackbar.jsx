import { Alert, Snackbar, css } from "@mui/material";
import React from "react";

function SuccessSnackbar({open, setOpen, message = "Operación realizada correctamente"}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
    >
      <Alert
        css={css`
          background-color: #04aa6d;
          color: white;
          font-size: 1.2rem;

          svg {
            color: white;
          }
        `}
        onClose={() => setOpen(false)}
        severity="success"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SuccessSnackbar;
