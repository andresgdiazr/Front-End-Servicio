import React from "react";
import {
	Box,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	styled,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const MenuButton = styled(Typography)(({ theme }) => ({
	padding: theme.spacing(2),
	[theme.breakpoints.down("md")]: {
		padding: theme.spacing(1.5),
	},
	[theme.breakpoints.down("md")]: {
		padding: theme.spacing(1),
	},
	fontSize: "1.2rem",
	fontWeight: "bold",
	cursor: "pointer",
	"&:hover": {
		backgroundColor: theme.palette.primary.dark,
	},
}));

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
			<AppBar
				position="fixed" 
				color="primary"
				sx={{
					overflowY:"hidden",
					overflowX:"scroll",
				}}>
				
				<Toolbar
					display="flex"
					sx={{
						justifyContent: { xs: "flex-start", xl: "center" },
						flexDirection: { xl: "row" },
					}}
				>
					<Box sx={{ flexGrow: { xs: "1", xl: "initial" } }}>
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
			<Toolbar/>
		</>
	);
};

export default Navbar;
