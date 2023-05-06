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
	padding: theme.spacing(2),
	fontSize: "1.2rem",
	fontWeight: "bold",
	cursor: "pointer",
	"&:hover": {
		backgroundColor: theme.palette.primary.dark,
	},
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
		<>
			<AppBar position="static" color="primary">
				<Toolbar
					display="flex"
					sx={{
						justifyContent: { xs: "flex-start", xl: "center" },
					}}
				>
					<Box sx={{ flexGrow: { xs: "1", xl: "initial" } }}>
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
					<Box sx={{ flexGrow: { xs: "0", xl: "initial" } }}>
						<MenuButton component="a" onClick={onLogout}>
							Cerrar sesión
						</MenuButton>
					</Box>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Navbar;
