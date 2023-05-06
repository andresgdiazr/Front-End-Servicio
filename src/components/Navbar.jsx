import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  styled,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";

const MenuButton = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(2),
  fontSize: "1.2rem",
  fontWeight: "bold",
  cursor: "pointer",
  alignSelf: "center",
}));

const Container = styled(Typography)(({ theme }) => ({
  offset: theme.mixins.toolbar,
}));

// TODO debe haber una manera de que esto sea dinámico, o si no se debe eliminar
const defaultNames = [["Inicio", "/"]];

const Navbar = ({ names = defaultNames }) => {
  const navigate = useNavigate();

  const navegador = (data) => {
    navigate(data, { state: names });
  };

  const onLogout = () => {
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <IconButton color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            {names.map((name, idx) => {
              return (
                <MenuButton
                  key={idx}
                  component="a"
                  onClick={() => {
                    navegador(name[1]);
                  }}
                >
                  {name[0]}
                </MenuButton>
              );
            })}
          </Box>
          <Box sx={{ flexGrow: 0, display: "flex" }}>
            <MenuButton component="a" onClick={onLogout}>
              Cerrar Sesión
            </MenuButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Container></Container>
    </div>
  );
};

export default Navbar;
