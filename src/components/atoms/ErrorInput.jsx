import { css, Typography } from "@mui/material";
import React from "react";

function ErrorInput({ message, show }) {
  return (
    <Typography
      css={css`
        color: red;
        ${!show && "display:none"}
      `}
    >
      {message}
    </Typography>
  );
}

export default ErrorInput;
