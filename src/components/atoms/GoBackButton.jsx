import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { ArrowBack } from "@mui/icons-material";
import { css, Typography } from "@mui/material";

function GoBackButton({ to }) {

  const navigate = useNavigate()

  return (
    <a
      onClick={ () => to == 'prev' ? navigate(-1,{replace:true}) :  navigate(to) }
      css={css`
        display: flex;
        align-items: center;
        p {
          font-size: 1.1rem;
        }

        margin: 0.5rem 0 1rem;

        svg {
          font-size: 1.7rem;
          margin-right: 0.5rem;
        }
      `}
    >
      <ArrowBack />
      <Typography> Volver </Typography>
    </a>
  );
}

export default GoBackButton;
