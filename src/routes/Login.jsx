import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";

import LogoImg from "../assets/logo.jpeg";
import { Button, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setName } from "../store/features/main";

function Login() {
  const [email, setEmail] = useState("");
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    axios
      .post("/login", { email, password })
      .then((response) => {
        const token = response.data.token;

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user-type", response.data.userType);
        sessionStorage.setItem("name", response.data.name);
        dispatch(setName(response.data.name))
        

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        if (response.data.userType == "Administrador") {
          navigate("/dashboard-control");
        } else if (response.data.userType == "Profesor") {
          navigate("/dashboard-profesor");
        }
      })
      .catch((err) => setInvalidCredentials(true));
  };

  return (
    <div
      css={css`
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        h1 {
          margin: 0;
        }

        form {
          width: 400px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: center;
          margin-top: calc(7vh + 1rem);
        }

        img {
          width: 225px;
        }
      `}
    >
      <form action="" id="login" method="post" onSubmit={handleSubmit}>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
          `}
        >
          <img src={LogoImg} alt="logo-img" />
        </div>

        <div
          css={css`
            margin: 1.5rem 0 1.5rem;

          `}
        >
          {invalidCredentials && (
            <Typography
              css={css`
                color: tomato;
              `}
            >
              Credenciales Invalidas
            </Typography>
          )}

          <TextField
						css={css`width:100%;margin-top:0.8rem;`}
            value={email}
            label="Email"
            variant="outlined"
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </div>
        <TextField
          value={password}
          label="Contraseña"
          variant="outlined"
          onChange={(ev) => setPassword(ev.target.value)}
          type="password"
        />

        <Button
          css={css`
            margin-top: 2rem;
          `}
          type="submit"
          variant="contained"
        >
          Ingresar
        </Button>
      </form>
    </div>
  );
}

export default Login;
