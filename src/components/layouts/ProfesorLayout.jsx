import React from "react";
import axios from 'axios'

import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";

import Navbar from "../Navbar";

const token =
  "MTM.4FirW3vWnBGfI-gRyexXnapw9M-KY_Y5qDr-3uSd7mdVAbWDcX7XevnQVcEI";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

function ProfesorLayout() {

  return (
    <div>
      <Navbar names={["Datos", "Casos"]} />
      <div
        css={css`
          margin-top: 64px;
          padding: 1rem 2rem;
        `}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default ProfesorLayout;
