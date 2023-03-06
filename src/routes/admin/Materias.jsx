import { css } from "@emotion/react";
import React from "react";
import { Link } from "react-router-dom";
import GoBackButton from "../../components/atoms/GoBackButton";

function Materias() {
  const años = [
    { display: "Primer año", year: 1 },
    { display: "Segundo año", year: 2 },
    { display: "Tercer año", year: 3 },
    { display: "Cuarto año", year: 4 },
    { display: "Quinto año", year: 5 },
  ];

  return (
    <div
      css={css`
        ul li {
          font-size: 1.5rem;
          margin: 1rem 0rem;
        }
      `}
    >
      <GoBackButton to={"prev"} />

      <h1>Administracion de materias</h1>
      <h2>Materias por año</h2>

      <ul>
        {años.map(({ display, year }) => {
          return (
            <li key={year}>
              <Link
                to={`/dashboard-control/admin/materias/year/${year}`}
                state={{ display, year }}
              >
                {display}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Materias;
