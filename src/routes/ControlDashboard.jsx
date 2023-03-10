import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { css, Typography } from "@mui/material";
import Overlay from "../components/organisms/Overlay";

function ControlDashboard() {
  const name = useSelector((state) => state.main.name);
  return (
    <div
      css={css`
        h1 {
					margin-top:0.6rem;
          font-size: 1.8rem;
        }

        .link-group {
          display: flex;
					align-items:flex-start;
          flex-direction: column;
					margin-top:2rem;

					a p {
						font-size:1.3rem;
						margin:0.5rem 0;
					}


        }
      `}
    >
      <Typography variant="h1"> Bienvenido administrador {name} </Typography>
      <Typography> ¿Qué desea hacer? </Typography>
      <div className="link-group">
        <Link to="admin/profesores" >
          <Typography> Administrar Profesores </Typography> 
        </Link>
        <Link to="admin/secciones" >
          <Typography> Adminsitrar secciones </Typography>
        </Link>
        <Link to="admin/materias" >
          <Typography> Administrar materias </Typography>
        </Link>
      </div>

      <div className="link-group">
        <Link to="/" >
          <Typography> Aministrar supervisor</Typography>
        </Link>
        <Link to="/" >
          <Typography> Administrar administrador</Typography>
        </Link>
        <Link to="/" >
          <Typography> Crear cuenta</Typography>
        </Link>
      </div>
    </div>
  );
}

export default ControlDashboard;
