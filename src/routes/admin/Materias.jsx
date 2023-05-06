import { css } from "@emotion/react";
import React from "react";
import { Link } from "react-router-dom";

function Materias() {
  return (
    <div
      css={css`
        ul li {
          font-size: 1.5rem;
          margin: 1rem 0rem;
        }
      `}
    >
      <h1>Administracion de materias</h1>
      <h2>Materias por año</h2>

      <ul>
        <li>
          <Link to={`/dashboard-control/admin/materias/primero`}>
            Primer año
          </Link>
        </li>
        <li>
          <Link to={`/dashboard-control/admin/materias/segundo`}>
            Segundo año
          </Link>
        </li>
        <li>
          <Link to={`/dashboard-control/admin/materias/tercero`}>
            Tercer año
          </Link>
        </li>
        <li>
          <Link to={`/dashboard-control/admin/materias/cuarto`}>
            Cuarto año
          </Link>
        </li>
        <li>
          <Link to={`/dashboard-control/admin/materias/quinto`}>
            Quinto año
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Materias;
