import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  styled,
  css,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";

const MenuButton = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const Container = styled(Typography)(({ theme }) => ({
  offset: theme.mixins.toolbar,
}));

// TODO debe haber una manera de que esto sea dinámico o si no se debe eliminar
const defaultNames = [
  ["Inicio", "/"],
];

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
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Box sx={{ flexGrow: 3, display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" aria-label="menu" sx={{ spacing: 2 }}>
              <MenuIcon />
            </IconButton>
            {names.map((name, idx) => {
              return (
                <MenuButton
                  key={idx}
                  onClick={() => {
                    navegador(name[1]);
                  }}
                  variant="h6"
                >
                  {name[0]}
                </MenuButton>
              );
            })}
          </Box>
          <MenuButton variant="h6">Mi cuenta</MenuButton>
          <Typography
            css={css`
              cursor: pointer;
            `}
            onClick={onLogout}
            variant="h6"
          >
            Cerrar Sesión
          </Typography>
        </Toolbar>
      </AppBar>
      <Container></Container>
    </div>
  );
};

export default Navbar;
