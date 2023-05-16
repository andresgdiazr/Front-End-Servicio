import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";

import LogoImg from "assets/logo.jpeg";
import { Button, TextField, Typography, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLoading, setName } from "store/features/main";
import CustomForm from "components/CustomForm";

function Login() {
  const [email, setEmail] = useState("");
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    axios
      .post("/login", { email, password })
      .then((response) => {
        const token = response.data.token;

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user-type", response.data.userType);
        sessionStorage.setItem("name", response.data.name);
        dispatch(setName(response.data.name));

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        if (response.data.userType == "Administrador") {
          navigate("/dashboard-control");
        } else if (response.data.userType == "Profesor") {
          navigate("/dashboard-profesor");
        } else {
          setInvalidCredentials(true);
        }
      })
      .catch((err) => setInvalidCredentials(true))
      .finally(() => dispatch(setLoading(false)));
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setInvalidCredentials(false);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setInvalidCredentials(false);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img
        css={css`
          margin-top: calc(7vh + 1rem);
        `}
        src={LogoImg}
        alt="logo-img"
        width="225px"
      />

      <CustomForm
        action=""
        id="login"
        method="post"
        onSubmit={handleSubmit}
        sx={{
          alignItems: "stretch",
          margin: "1.5rem 0",
          width: "400px",
          color: "red",
          "& Button": {
            alignSelf: "stretch",
          },
        }}
      >
        <Typography sx={{ marginBottom: "0.5rem",visibility: invalidCredentials ? 'initial': 'hidden'   }} color="tomato">
          Credenciales Invalidas
        </Typography>
        <TextField
          value={email}
          label="Email"
          variant="outlined"
          onChange={onChangeEmail}
        />
        <TextField
          value={password}
          label="Contraseña"
          variant="outlined"
          onChange={onChangePassword}
          type="password"
        />

        <Button type="submit" variant="contained">
          Ingresar
        </Button>
      </CustomForm>
    </Container>
  );
}

export default Login;
